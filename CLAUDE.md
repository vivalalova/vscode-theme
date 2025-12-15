# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

VS Code 色彩主題擴展，包含 17 個主題（8 深色 + 9 淺色）。

## 本地安裝

```bash
./ln.sh
```

## 主題列表

| 主題 | 類型 | 檔案 |
|------|------|------|
| Lova Monokai Green | 深色 | `themes/dark-green.json` |
| Lova Cursor Light | 淺色 | `themes/cursor-light.json` |
| Lova Ocean Depths | 深色 | `themes/ocean-depths.json` |
| Lova Tech Innovation | 深色 | `themes/tech-innovation.json` |
| Lova Midnight Galaxy | 深色 | `themes/midnight-galaxy.json` |
| Lova Arctic Frost | 淺色 | `themes/arctic-frost.json` |
| Lova Forest Canopy | 深色 | `themes/forest-canopy.json` |
| Lova Sunset Boulevard | 深色 | `themes/sunset-boulevard.json` |
| Lova Claude | 淺色 | `themes/claude.json` |
| Lova Claude Dark | 深色 | `themes/claude-dark.json` |
| Lova Teams | 淺色 | `themes/teams.json` |
| Lova Teams Dark | 深色 | `themes/teams-dark.json` |
| Lova macOS Light | 淺色 | `themes/macos-light.json` |
| Lova iOS Light | 淺色 | `themes/ios-light.json` |
| Lova Android Light | 淺色 | `themes/android-light.json` |
| Lova Nintendo Light | 淺色 | `themes/nintendo-light.json` |
| Lova Sony Light | 淺色 | `themes/sony-light.json` |

## 檔案結構

- `themes/*.json` - 主題定義（UI 色彩 + 語法高亮）
- `examples/` - 各語言範例檔案，用於預覽主題效果
- `package.json` - 擴展 manifest

## 開發流程

1. 編輯 `themes/*.json` 中的任一主題
2. VS Code 中 `Cmd+Shift+P` → `Developer: Reload Window` 查看變更
3. 使用 `examples/` 中的檔案測試各語言語法高亮

## 規範

- 有改動時視情況更新 CLAUDE.md 和 README.md
