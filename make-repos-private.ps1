# PowerShell Script to Install GitHub CLI and Make All Repositories Private
# Author: GitHub Copilot
# Date: January 9, 2026

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Privacy Automation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if GitHub CLI is installed
Write-Host "[1/5] Checking GitHub CLI installation..." -ForegroundColor Yellow

$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "GitHub CLI is not installed. Installing now..." -ForegroundColor Yellow
    
    # Check if winget is available
    $wingetInstalled = Get-Command winget -ErrorAction SilentlyContinue
    
    if ($wingetInstalled) {
        Write-Host "Installing GitHub CLI using winget..." -ForegroundColor Green
        winget install --id GitHub.cli --silent --accept-source-agreements --accept-package-agreements
        
        # Refresh PATH
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        Write-Host "GitHub CLI installed successfully!" -ForegroundColor Green
        Write-Host "Please restart PowerShell or run: `$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "After restarting, run this script again." -ForegroundColor Yellow
        exit
    }
    else {
        Write-Host "Winget is not available. Please install GitHub CLI manually from:" -ForegroundColor Red
        Write-Host "https://cli.github.com/" -ForegroundColor Cyan
        exit 1
    }
}
else {
    Write-Host "âœ“ GitHub CLI is already installed" -ForegroundColor Green
}

Write-Host ""

# Step 2: Check authentication status
Write-Host "[2/5] Checking GitHub authentication..." -ForegroundColor Yellow

$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "You are not authenticated with GitHub." -ForegroundColor Yellow
    Write-Host "Starting authentication process..." -ForegroundColor Yellow
    Write-Host ""
    
    # Login to GitHub
    gh auth login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Authentication failed. Please try again." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "âœ“ Successfully authenticated!" -ForegroundColor Green
}
else {
    Write-Host "âœ“ Already authenticated with GitHub" -ForegroundColor Green
}

Write-Host ""

# Step 3: Get list of all repositories
Write-Host "[3/5] Fetching your repositories..." -ForegroundColor Yellow

$repos = gh repo list --limit 1000 --json name,nameWithOwner,isPrivate,owner | ConvertFrom-Json

if ($repos.Count -eq 0) {
    Write-Host "No repositories found." -ForegroundColor Yellow
    exit 0
}

Write-Host "âœ“ Found $($repos.Count) repositories" -ForegroundColor Green
Write-Host ""

# Step 4: Filter public repositories
Write-Host "[4/5] Analyzing repository visibility..." -ForegroundColor Yellow

$publicRepos = $repos | Where-Object { -not $_.isPrivate }
$privateRepos = $repos | Where-Object { $_.isPrivate }

Write-Host "  - Private repositories: $($privateRepos.Count)" -ForegroundColor Green
Write-Host "  - Public repositories: $($publicRepos.Count)" -ForegroundColor Yellow

if ($publicRepos.Count -eq 0) {
    Write-Host ""
    Write-Host "All repositories are already private! Nothing to do." -ForegroundColor Green
    exit 0
}

Write-Host ""

# Step 5: Make all public repositories private
Write-Host "[5/5] Making repositories private..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0
$skippedCount = 0

# Get current user once
$currentUser = gh api user --jq .login 2>&1

foreach ($repo in $publicRepos) {
    $repoName = $repo.nameWithOwner
    
    # Check if the repository belongs to the authenticated user (not an organization)
    if ($repo.owner.login -ne $currentUser) {
        Write-Host "  âŠ˜ Skipping $repoName (belongs to organization: $($repo.owner.login))" -ForegroundColor Gray
        $skippedCount++
        continue
    }
    
    Write-Host "  â†’ Making $repoName private..." -ForegroundColor Cyan
    
    $result = gh repo edit $repoName --visibility private 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  âœ“ $repoName is now private" -ForegroundColor Green
        $successCount++
    }
    else {
        Write-Host "  âœ— Failed to make $repoName private" -ForegroundColor Red
        Write-Host "    Error: $result" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Total repositories: $($repos.Count)" -ForegroundColor White
Write-Host "  Already private: $($privateRepos.Count)" -ForegroundColor Green
Write-Host "  Made private: $successCount" -ForegroundColor Green
Write-Host "  Skipped (organizations): $skippedCount" -ForegroundColor Gray
Write-Host "  Failed: $failCount" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "âœ“ Successfully made $successCount repositories private!" -ForegroundColor Green
}

if ($skippedCount -gt 0) {
    Write-Host ""
    Write-Host "Note: Organization repositories were skipped. To make them private:" -ForegroundColor Yellow
    Write-Host "  1. Go to the organization settings on GitHub" -ForegroundColor Yellow
    Write-Host "  2. Navigate to each repository's settings" -ForegroundColor Yellow
    Write-Host "  3. Change visibility to private manually" -ForegroundColor Yellow
}

if ($failCount -gt 0) {
    Write-Host ""
    Write-Host "Some repositories failed. Please check the errors above." -ForegroundColor Red
    exit 1
}
