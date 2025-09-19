import { type McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export function registerMathTools(server: McpServer) {
  // Simple addition tool
  server.tool('add', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
    content: [{ type: 'text', text: String(a + b) }],
  }))

  // Calculator tool with multiple operations
  server.tool(
    'calculate',
    {
      operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
      a: z.number(),
      b: z.number(),
    },
    async ({ operation, a, b }) => {
      let result: number
      switch (operation) {
        case 'add':
          result = a + b
          break
        case 'subtract':
          result = a - b
          break
        case 'multiply':
          result = a * b
          break
        case 'divide':
          if (b === 0)
            return {
              content: [
                {
                  type: 'text',
                  text: 'Error: Cannot divide by zero',
                },
              ],
            }
          result = a / b
          break
      }
      return { content: [{ type: 'text', text: String(result) }] }
    }
  )

  // Advanced calculator
  server.tool(
    'advanced_calculate',
    {
      operation: z.enum(['power', 'sqrt', 'factorial']),
      value: z.number(),
      exponent: z.number().optional(),
    },
    async ({ operation, value, exponent }) => {
      let result: number
      switch (operation) {
        case 'power':
          result = Math.pow(value, exponent || 2)
          break
        case 'sqrt':
          result = Math.sqrt(value)
          break
        case 'factorial':
          result = factorial(value)
          break
      }
      return { content: [{ type: 'text', text: String(result) }] }
    }
  )
}

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1)
}
