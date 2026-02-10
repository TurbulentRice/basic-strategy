# Troubleshooting Guide

Common issues and solutions for the Basic Strategy app.

## Installation Issues

### Package Version Mismatches

**Problem**: Warnings about incompatible package versions

**Solution**:
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors After Install

**Problem**: `Option 'customConditions' can only be used when...`

**Solution**: Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

## Runtime Issues

### iOS Simulator Error: 'PlatformConstants' not found

**Problem**: Native modules not found after package updates

**Solution**:
1. Ensure all packages match Expo SDK version
2. Clear Metro cache:
```bash
npm start -- --clear
```

### Web Bundling Error: 'react-native-web' not found

**Problem**: Missing web dependencies

**Solution**:
```bash
npm install react-native-web@^0.21.0 react-dom@19.1.0
```

## Test Issues

### Jest Error: 'expo-modules-core' not found

**Problem**: Jest trying to load Expo modules

**Solution**: Already fixed in `jest.config.js` and `jest.setup.js`
- Uses `react-native` preset instead of `jest-expo`
- Mocks Expo modules

### Tests Failing After Package Update

**Problem**: Test dependencies out of sync

**Solution**:
```bash
npm install --save-dev react-test-renderer@19.1.0
npm test -- --clearCache
npm test
```

## Development Issues

### Port Already in Use

**Problem**: Metro bundler port 8081 occupied

**Solution**:
```bash
# Kill the process
npx kill-port 8081

# Or use a different port
npm start -- --port 8082
```

### App Not Updating in Simulator

**Problem**: Changes not reflecting

**Solution**:
1. Reload app: Press `R` in Metro terminal
2. Clear cache: `npm start -- --clear`
3. Rebuild: Close simulator and restart

### TypeScript Errors in IDE

**Problem**: VS Code showing errors that don't exist

**Solution**:
1. Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Run `npm run type-check` to verify
3. Check `tsconfig.json` is correct

## Build Issues

### Missing App Icons

**Problem**: `ENOENT: no such file or directory, open './assets/icon.png'`

**Solution**: Already fixed - app uses SVG placeholders
- For production, replace with actual PNG icons

### Android Build Fails

**Problem**: Various Android build errors

**Solution**:
```bash
cd android
./gradlew clean
cd ..
npm start
```

## Common Errors

### "Invariant Violation: requireNativeComponent"

**Problem**: Native component not found

**Solution**:
- Restart Metro bundler
- Clear cache: `npm start -- --clear`
- Reinstall dependencies

### "Cannot find module '@/types'"

**Problem**: TypeScript path alias not working

**Solution**: Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### "Element type is invalid"

**Problem**: Component import issue

**Solution**:
- Check import statements
- Ensure component is exported correctly
- Restart Metro bundler

## Performance Issues

### Slow Scrolling

**Problem**: Chart scrolling laggy

**Solution**:
- Close other apps
- Run in production mode: `expo start --no-dev`
- Test on physical device (simulators are slower)

### High Memory Usage

**Problem**: App using too much memory

**Solution**:
- Restart simulator/emulator
- Clear Metro cache
- Close other applications

## Git Issues

### Uncommitted Changes After Setup

**Problem**: Many files modified

**Solution**:
```bash
git add .
git commit -m "Initial setup complete"
```

### Large node_modules in Git

**Problem**: Accidentally committed node_modules

**Solution**:
- Ensure `.gitignore` includes `node_modules/`
- Remove from git: `git rm -r --cached node_modules`

## Debugging Tips

### Enable Debug Mode

```bash
npm start -- --dev-client
```

### View Logs

**iOS Simulator**:
- Cmd+D in simulator → "Toggle Element Inspector"

**Android Emulator**:
- Cmd+M in emulator → "Toggle Inspector"

**Metro Bundler**:
- Watch terminal output for errors and warnings

### Check Dependencies

```bash
# List all installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Verify package versions
npx expo-doctor
```

## Getting Help

### Check Documentation
1. Main [README.md](../README.md)
2. [Technical docs](./TECHNICAL.md)
3. Inline code comments

### Verify Setup
```bash
# Run all checks
npm run type-check  # TypeScript
npm test            # Tests
npm run lint        # Linting
```

### Clean Slate
If all else fails, start fresh:
```bash
# Full reset
rm -rf node_modules package-lock.json
rm -rf .expo
npm install --legacy-peer-deps
npm start -- --clear
```

## Resolved Issues

These issues have been fixed in the codebase:

✅ Package version mismatches (React 19 upgrade)
✅ TypeScript moduleResolution config
✅ Jest expo-modules-core errors
✅ Missing react-native-web dependency
✅ Missing app icons (SVG placeholders)
✅ Babel deprecated plugins warning

## Prevention

### Before Making Changes
1. Commit working code
2. Run tests: `npm test`
3. Check types: `npm run type-check`
4. Make incremental changes
5. Test frequently

### After Package Updates
1. Clear cache: `npm start -- --clear`
2. Run tests: `npm test`
3. Check types: `npm run type-check`
4. Test in simulator

---

**Still Having Issues?**

1. Check error message carefully
2. Search error in GitHub issues
3. Review recent changes
4. Try clean install
5. Document the solution if you find one!
