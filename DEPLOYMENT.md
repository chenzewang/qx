# 🚀 部署指南

本文档详细说明如何将"小狗牵红线"游戏部署到各种平台。

## 📋 部署前准备

1. 确保所有文件都在项目根目录
2. 检查所有资源文件路径正确
3. 测试本地运行是否正常

## 🎯 推荐部署方案

### 方案一：GitHub Pages（最推荐）

#### 步骤：

1. **创建GitHub仓库**
   ```bash
   # 初始化Git仓库
   git init
   git add .
   git commit -m "🎉 Initial commit: 七夕小狗牵红线游戏"
   
   # 添加远程仓库（替换为你的用户名）
   git remote add origin https://github.com/your-username/qx.git
   git branch -M main
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入GitHub仓库设置页面
   - 找到"Pages"选项
   - Source选择"GitHub Actions"
   - 推送代码后会自动部署

3. **访问网站**
   - 部署完成后访问：`https://your-username.github.io/qx/`

#### 优势：
- ✅ 完全免费
- ✅ 自动部署
- ✅ 稳定可靠
- ✅ 支持自定义域名

---

### 方案二：Netlify

#### 步骤：

1. **通过Git部署**
   - 访问 [netlify.com](https://netlify.com)
   - 点击"New site from Git"
   - 连接GitHub仓库
   - 选择qx仓库
   - 部署设置保持默认即可

2. **通过拖拽部署**
   - 将整个项目文件夹拖拽到Netlify部署页面
   - 自动生成随机域名

#### 优势：
- ✅ 部署速度快
- ✅ 免费额度充足
- ✅ 支持表单处理
- ✅ 全球CDN加速

---

### 方案三：Vercel

#### 步骤：

1. **通过Git部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击"New Project"
   - 导入GitHub仓库
   - 部署设置保持默认

2. **通过CLI部署**
   ```bash
   # 安装Vercel CLI
   npm i -g vercel
   
   # 登录并部署
   vercel login
   vercel --prod
   ```

#### 优势：
- ✅ 极快的部署速度
- ✅ 自动优化
- ✅ 全球边缘网络
- ✅ 零配置部署

---

## 🔧 其他部署选项

### 传统虚拟主机

如果你有传统的虚拟主机，只需要：

1. 将所有文件上传到网站根目录
2. 确保index.html在根目录
3. 访问你的域名即可

### 自建服务器

```bash
# 使用Nginx
sudo apt update
sudo apt install nginx
sudo cp -r /path/to/qx/* /var/www/html/
sudo systemctl restart nginx

# 使用Apache
sudo apt install apache2
sudo cp -r /path/to/qx/* /var/www/html/
sudo systemctl restart apache2
```

## 📱 移动端优化

部署后建议测试以下内容：

1. **响应式设计**
   - 在不同屏幕尺寸下测试
   - 检查触摸操作是否正常

2. **性能优化**
   - 压缩图片文件
   - 启用Gzip压缩
   - 设置合适的缓存策略

3. **SEO优化**
   - 添加meta标签
   - 设置Open Graph标签
   - 添加favicon

## 🌐 自定义域名

### GitHub Pages
1. 在仓库设置中添加自定义域名
2. 在域名DNS设置中添加CNAME记录指向 `your-username.github.io`

### Netlify
1. 在Netlify控制台中添加自定义域名
2. 按照提示配置DNS记录

### Vercel
1. 在Vercel控制台中添加域名
2. 配置DNS记录指向Vercel的服务器

## 🔍 故障排除

### 常见问题：

1. **资源文件404错误**
   - 检查文件路径是否正确
   - 确保文件名大小写匹配

2. **GitHub Pages部署失败**
   - 检查Actions日志
   - 确保仓库设置正确

3. **移动端显示异常**
   - 检查viewport设置
   - 测试触摸事件

### 调试技巧：

```bash
# 本地测试
python3 -m http.server 8000

# 检查控制台错误
# 在浏览器开发者工具中查看Console和Network标签
```

## 📊 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 所有图片资源加载正常
- [ ] 游戏功能完整可用
- [ ] 移动端适配良好
- [ ] 音效正常播放
- [ ] 各关卡剧情显示正确

## 🎉 部署完成

恭喜！你的七夕小游戏已经成功部署上线了！

现在可以分享给你的女朋友，让她体验这个专属的浪漫小游戏吧！💕

---

💡 **小贴士**：记得在社交媒体上分享你的游戏链接，让更多人体验这份浪漫！