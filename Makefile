# Variables
SOURCE_DIR = _site/
DEST_DIR = ../html/
JEKYLL = JEKYLL_ENV=production bundle exec jekyll

.PHONY: all build deploy clean pull

# Default: Pull latest code, build, and move to web root
all: pull build deploy

# 1. Sync from GitHub
pull:
	@echo "--- Pulling latest changes from Git ---"
	git pull origin main

# 2. Compile the Jekyll site with production flag
build:
	@echo "--- Starting Production Build ---"
	$(JEKYLL) build

# 3. Copy files to /var/www/html
# -v: verbose, -a: archive mode, -z: compress, --delete: sync removals
deploy:
	@echo "--- Deploying to $(DEST_DIR) ---"
	rsync -avz --delete $(SOURCE_DIR) $(DEST_DIR)
	@echo "--- Live at https://dannylty.com ---"

# Clean build artifacts
clean:
	@echo "--- Cleaning cache ---"
	bundle exec jekyll clean