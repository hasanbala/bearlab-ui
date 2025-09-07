#!/bin/bash

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "lerna.json" ] || [ ! -f "package.json" ]; then
    print_error "This script must be run from the root of the monorepo"
    exit 1
fi

# Check if user is logged in to npm
if ! npm whoami >/dev/null 2>&1; then
    print_error "You are not logged in to npm. Please run 'npm login' first"
    exit 1
fi

print_status "Starting build and publish process..."

# Clean all packages first
print_status "Cleaning all packages..."
npm run clean

# Build all packages
print_status "Building all packages..."
if ! npm run build:all; then
    print_error "Build failed"
    exit 1
fi

print_success "All packages built successfully"

# Ask for confirmation before publishing
read -p "$(echo -e ${YELLOW}Do you want to proceed with publishing? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Publishing cancelled"
    exit 0
fi

# Publishing order - dependencies first
declare -a packages=(
    "core"
    "view-error"
    "button"
    "badge"
    "textarea"
    "checkbox"
    "copy"
    "dropzone"
    "file-input"
    "go-back"
    "hooks"
    "input"
    "loading"
    "otp-form"
    "popover"
    "radio"
    "select"
    "skeleton"
    "switch"
    "view-card"
)

# Function to publish a single package
publish_package() {
    local package_name=$1
    local package_path="packages/$package_name"
    
    # Map folder names to npm package names
    case $package_name in
        "file-input") npm_name="file-input" ;;
        "go-back") npm_name="go-back" ;;
        "otp-form") npm_name="otp-form" ;;
        "view-card") npm_name="view-card" ;;
        "view-error") npm_name="view-error" ;;
        *) npm_name="$package_name" ;;
    esac
    
    print_status "Publishing @bearlab/$npm_name..."
    
    # Check if package directory exists
    if [ ! -d "$package_path" ]; then
        print_warning "Package directory $package_path not found, skipping..."
        return 0
    fi
    
    # Check if dist folder exists
    if [ ! -d "$package_path/dist" ]; then
        print_error "Dist folder not found for $package_name. Build may have failed."
        return 1
    fi
    
    # Navigate to package directory
    cd "$package_path"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in $package_path"
        cd "../.."
        return 1
    fi
    
    # Get current version from package.json
    local current_version=$(node -p "require('./package.json').version")
    
    # Check if this version is already published
    if npm view "@bearlab/$npm_name@$current_version" version >/dev/null 2>&1; then
        print_warning "@bearlab/$npm_name@$current_version is already published, skipping..."
        cd "../.."
        return 0
    fi
    
    # Attempt to publish
    if npm publish --access public; then
        print_success "Published @bearlab/$npm_name@$current_version"
        cd "../.."
        return 0
    else
        print_error "Failed to publish @bearlab/$npm_name"
        cd "../.."
        return 1
    fi
}

# Publish packages in order
failed_packages=()
successful_packages=()

for package in "${packages[@]}"; do
    if publish_package "$package"; then
        successful_packages+=("$package")
    else
        failed_packages+=("$package")
        print_warning "Continuing with next package..."
    fi
    
    # Add small delay between publishes
    sleep 2
done

# Summary
echo
print_status "Publishing Summary:"
echo "==================="

if [ ${#successful_packages[@]} -gt 0 ]; then
    print_success "Successfully published ${#successful_packages[@]} packages:"
    for package in "${successful_packages[@]}"; do
        echo "  ✅ @bearlab/$package"
    done
fi

if [ ${#failed_packages[@]} -gt 0 ]; then
    print_error "Failed to publish ${#failed_packages[@]} packages:"
    for package in "${failed_packages[@]}"; do
        echo "  ❌ @bearlab/$package"
    done
    echo
    print_error "Some packages failed to publish. Please check the errors above and try again."
    exit 1
else
    echo
    print_success "🎉 All packages published successfully!"
fi