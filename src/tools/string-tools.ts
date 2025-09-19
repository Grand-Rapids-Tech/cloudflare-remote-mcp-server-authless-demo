import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export function registerStringTools(server: McpServer) {
  server.tool(
    'format_text',
    {
      text: z.string(),
      format: z.enum(['uppercase', 'lowercase', 'title']),
    },
    async ({ text, format }) => {
      let result: string
      switch (format) {
        case 'uppercase':
          result = text.toUpperCase()
          break
        case 'lowercase':
          result = text.toLowerCase()
          break
        case 'title':
          result = text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
          break
      }
      return { content: [{ type: 'text', text: result }] }
    }
  )
}
