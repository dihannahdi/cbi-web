# GitHub Copilot Instructions for CBI Web Project

## Project Overview

### Architecture
- **Deployment**: Use `vercel --prod` for production deployments

### VPS Details
- **IP**: 72.62.122.166
- **User**: root
- **Domain**: cbi-backend.my.id and centrabiotechindonesia.com
- **Strapi Path**: /opt/cbi-strapi/

---

## SSH/VPS Access Protocol

### Critical Rule
**ALWAYS use the EXACT SAME TERMINAL for all subsequent SSH commands after initial login.**

### Opening Terminal Protocol

#### For General Terminal Requests
- When user asks to "open terminal" WITHOUT mentioning SSH/VPS/login
- Execute a simple test command: `echo "Terminal ready"`

#### For SSH/VPS Login Requests
- When user asks to "log in", "open SSH", or mentions VPS
- **Execute ONLY**: `ssh hostinger`
- **STOP COMPLETELY** - Do not execute any other commands
- Do not try to check anything or send follow-up terminal commands
- Do not interrupt the SSH login process with ANY tool calls
- Immediately yield control with: "SSH connection opened. Please log in, then let me know when you're ready."
- Wait for user to manually enter password and confirm login

### Session Management Rules

1. **Reuse Authenticated Sessions**: If an SSH session is already established, DO NOT create new SSH connections
2. **Single Terminal Policy**: Use the already-authenticated terminal for ALL VPS commands
3. **No Password Re-entry**: User does not want to re-enter passwords repeatedly
4. **Check History**: Check terminal history to identify which terminal has the active SSH session
5. **Always Use Full Command**: Never simplify or shorten the SSH command - always use `ssh root@72.62.122.166`

### Common VPS Operations (Use Same Terminal)
- Reading/editing config files
- PM2 operations (restart, logs, list)
- Database queries
- Checking service status
- Log viewing
- All Strapi backend modifications
- Article management (check articles on VPS via SSH)

### SCP Operations
- Use a separate terminal for SCP file transfers
- Return to SSH terminal after transfer completes

### Prohibited Actions
- ❌ Opening multiple SSH connections when one exists
- ❌ Asking for password repeatedly when session is active
- ❌ Switching between terminals unnecessarily
- ❌ Simplifying SSH commands

---

## Development Process Principles

### Core Principles
1. **Systematic Approach**: Work step by step, methodically, section by section
2. **Deep Analysis First**: Thoroughly understand all systems and files before making changes and all vps files and system.
3. **Complete Tasks Fully**: Work end-to-end without stopping until successful
4. **Verify After Each Step**: Test and confirm results at each checkpoint
5. **No Half-Finished Work**: Never leave tasks incomplete or partially implemented

### Code Development Standards
- For long code changes, implement in multiple steps and sections
- Break down complex tasks into manageable pieces
- Use Context7 for learning and documentation when needed
- Complete each task fully before moving to the next

### Design Standards
- **Consistency**: Make all designs seamless and consistent with existing website
- **No New Styles**: Use existing design patterns - do not create new design styles
- **Professional Quality**: Create professional, corporate, world-class design
- **Brand Alignment**: Follow corporate and company design standards

### Technical Standards
- **No Simplification**: Do not simplify technical solutions, terms, or instructions
- **Full Commands**: Always use complete commands (e.g., full SSH command)
- **Precision**: Maintain technical accuracy and completeness in all implementations

---

## Quick Reference

### SSH Command
```bash
ssh hostinger
```

### Deployment Command
```bash
vercel --prod
```

### Article Management
- Local files: Handle via workspace
- Articles on VPS: Always check via SSH connection

DONT USE SHADOW FOR THE DESIGN AND UI/UX