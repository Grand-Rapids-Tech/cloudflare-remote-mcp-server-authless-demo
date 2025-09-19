import { McpAgent } from 'agents/mcp'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { registerMathTools } from './tools/math-tools.js'
import { registerStringTools } from './tools/string-tools.js'

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'Authless Calculator',
    version: '1.0.0',
  })

  async init() {
    registerMathTools(this.server)
    registerStringTools(this.server)
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url)

    if (url.pathname === '/sse' || url.pathname === '/sse/message') {
      return MyMCP.serveSSE('/sse').fetch(request, env, ctx)
    }

    if (url.pathname === '/mcp') {
      return MyMCP.serve('/mcp').fetch(request, env, ctx)
    }

    return new Response('Not found', { status: 404 })
  },
}
