/**
 * Server-Sent Events (SSE) streaming utility
 * Provides a clean interface for handling SSE streams with fetch
 */

export type SSEStreamOptions = {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string | object;
  credentials?: RequestCredentials;
};

export type SSEMessage = {
  data: string;
  event?: string;
  id?: string;
  retry?: number;
};

/**
 * Stream data from an SSE endpoint
 *
 * @param options - Configuration for the SSE request
 * @param onMessage - Callback for each SSE message
 * @param onError - Optional error handler
 * @returns Promise that resolves when stream ends
 *
 * @example
 * ```typescript
 * await streamSSE({
 *   url: '/api/chat/stream',
 *   method: 'POST',
 *   body: { message: 'Hello' },
 *   headers: { 'Authorization': 'Bearer token' }
 * }, (message) => {
 *   console.log('Received:', message.data);
 * });
 * ```
 */
export async function streamSSE(
  options: SSEStreamOptions,
  onMessage: (message: SSEMessage) => void,
  onError?: (error: Error) => void,
): Promise<void> {
  const { url, method = "GET", headers = {}, body, credentials = "include" } = options;

  try {
    const requestInit: RequestInit = {
      method,
      headers: {
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        ...headers,
      },
      credentials,
    };

    // Add body for POST requests
    if (method === "POST" && body) {
      requestInit.headers = {
        "Content-Type": "application/json",
        ...requestInit.headers,
      };
      requestInit.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body available");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      let currentMessage: Partial<SSEMessage> = {};

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
          // Empty line indicates end of message
          if (currentMessage.data !== undefined) {
            onMessage(currentMessage as SSEMessage);
            currentMessage = {};
          }
        } else if (trimmedLine.startsWith(":")) {
          // Comment line, ignore
          continue;
        } else {
          // Parse field
          const colonIndex = trimmedLine.indexOf(":");
          if (colonIndex === -1) {
            // Field with no value
            const field = trimmedLine;
            if (field === "data") {
              currentMessage.data = `${currentMessage.data || ""}\n`;
            }
          } else {
            const field = trimmedLine.slice(0, colonIndex);
            const value = trimmedLine.slice(colonIndex + 1).trim();

            switch (field) {
              case "data":
                currentMessage.data = (currentMessage.data || "") + value;
                break;
              case "event":
                currentMessage.event = value;
                break;
              case "id":
                currentMessage.id = value;
                break;
              case "retry":
                currentMessage.retry = parseInt(value, 10);
                break;
            }
          }
        }
      }

      // Handle final message if buffer ends without empty line
      if (buffer === "" && currentMessage.data !== undefined) {
        onMessage(currentMessage as SSEMessage);
      }
    }
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    onError?.(errorObj);
    throw errorObj;
  }
}

export type TypedChunk = {
  content: string;
  type?: "text" | "tool_call" | "code" | "error";
  index?: number;
};

/**
 * SSE streaming with typed chunk support
 * Handles chunks that may contain type information
 *
 * @param options - SSE request options
 * @param onChunk - Callback for each typed chunk
 * @param onError - Optional error handler
 */
export async function streamSSETyped(
  options: SSEStreamOptions,
  onChunk: (chunk: TypedChunk) => void,
  onError?: (error: Error) => void,
): Promise<void> {
  await streamSSE(
    options,
    (message) => {
      const { data } = message;

      // Skip empty data or common end markers
      if (!data || data === "[DONE]" || data === "DONE") {
        return;
      }

      try {
        // Try to parse as JSON first
        const parsed = JSON.parse(data);
        if (parsed.done === true) {
          return; // End of stream marker
        }

        // Check if it has type or index information
        if (parsed.type || parsed.index !== undefined) {
          onChunk({
            content: parsed.content || parsed.text || "",
            type: parsed.type,
            index: parsed.index,
          });
        } else if (parsed.choices && parsed.choices[0]?.delta) {
          // OpenAI format with potential function calls
          const delta = parsed.choices[0].delta;
          const choice = parsed.choices[0];
          if (delta.tool_calls) {
            onChunk({
              content: JSON.stringify(delta.tool_calls),
              type: "tool_call",
              index: choice.index,
            });
          } else if (delta.content) {
            onChunk({
              content: delta.content,
              type: "text",
              index: choice.index,
            });
          }
        } else if (parsed.content) {
          // Generic content field
          onChunk({
            content: parsed.content,
            type: "text",
          });
        } else if (parsed.text) {
          // Generic text field
          onChunk({
            content: parsed.text,
            type: "text",
          });
        } else if (typeof parsed === "string") {
          // JSON string
          onChunk({
            content: parsed,
            type: "text",
          });
        }
      } catch {
        // Not JSON, treat as plain text
        onChunk({
          content: data,
          type: "text",
        });
      }
    },
    onError,
  );
}

/**
 * Simplified SSE streaming for text-only data
 * Extracts just the data field and handles common patterns
 *
 * @param options - SSE request options
 * @param onChunk - Callback for each data chunk
 * @param onError - Optional error handler
 */
export async function streamSSEText(
  options: SSEStreamOptions,
  onChunk: (chunk: string) => void,
  onError?: (error: Error) => void,
): Promise<void> {
  await streamSSE(
    options,
    (message) => {
      const { data } = message;

      // Skip empty data or common end markers
      if (!data || data === "[DONE]" || data === "DONE") {
        return;
      }

      try {
        // Try to parse as JSON first (OpenAI-style streaming)
        const parsed = JSON.parse(data);
        if (parsed.done === true) {
          return; // End of stream marker
        }

        // Handle different JSON response formats
        if (parsed.choices && parsed.choices[0]?.delta?.content) {
          // OpenAI chat completion format
          onChunk(parsed.choices[0].delta.content);
        } else if (parsed.content) {
          // Generic content field
          onChunk(parsed.content);
        } else if (parsed.text) {
          // Generic text field
          onChunk(parsed.text);
        } else if (typeof parsed === "string") {
          // JSON string
          onChunk(parsed);
        }
      } catch {
        // Not JSON, treat as plain text
        onChunk(data);
      }
    },
    onError,
  );
}
