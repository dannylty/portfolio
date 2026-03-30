#!/bin/bash

# Define the directory to search
TARGET_DIR="."

# Find all regular files, but skip the .git directory and other hidden folders
find "$TARGET_DIR" -path '*/.*' -prune -o -type f -print | while IFS= read -r file; do
    
    # Extract the extension and convert to lowercase
    # This uses parameter expansion: ##*. means "remove everything up to the last dot"
    ext="${file##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

    # Blacklist image extensions
    case "$ext_lower" in
        jpg|jpeg|png|gif|bmp|webp|svg|ico|tiff)
            continue
            ;;
        *)
            # Only process if it's a file with an extension (skips extensionless binaries)
            if [[ "$file" == *"."* ]]; then
                echo "================================================================================"
                echo "File Path: $file"
                echo "================================================================================"
                
                cat "$file"
                echo -e "\n\n"
            fi
            ;;
    esac
done
