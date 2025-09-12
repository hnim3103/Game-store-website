# Commit Rules

This document outlines the branch naming conventions and GitHub workflow setup for automatic linking between pull requests and Jira tickets.

## Branch Naming Convention

### Format
```
<type>/<issue-code>
```

### Branch Types
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring without functional changes
### Examples
```bash
feat/GSW-40     # New feature for ticket GSW-40
fix/GSW-125     # Bug fix for ticket GSW-125 
docs/GSW-89     # Documentation update for ticket GSW-89
```

## Creating Branches

### Step 1: Create Branch from Main
```bash
# Switch to dev branch and pull latest changes
git checkout dev
git pull origin dev

# Create and switch to new branch
git checkout -b feat/GSW-40

# Push branch to remote
git push -u origin feat/GSW-40
```

### Step 2: Commit Messages
Include the Jira ticket number in your commit messages:
```bash
git commit -m "feat(GSW-40): add user authentication module"
git commit -m "fix(GSW-125): resolve login redirect issue"
```