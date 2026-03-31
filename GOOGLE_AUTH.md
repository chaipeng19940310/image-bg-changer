# Google OAuth 配置指南

## 1. 创建 Google Cloud 项目

### 1.1 访问控制台
打开 [Google Cloud Console](https://console.cloud.google.com/)

### 1.2 创建新项目
1. 点击顶部导航栏的项目选择器（项目名称旁边）
2. 点击右上角「新建项目」
3. 输入项目名称，例如：`image-bg-changer`
4. 点击「创建」
5. 等待项目创建完成（几秒钟），然后选择这个项目

## 2. 配置 OAuth 同意屏幕

### 2.1 进入 OAuth 同意屏幕
1. 在左侧菜单中，找到「API 和服务」→「OAuth 同意屏幕」
2. 或直接访问：https://console.cloud.google.com/apis/credentials/consent

### 2.2 选择用户类型
- 如果是测试/个人项目：选择「外部」
- 点击「创建」

### 2.3 填写应用信息
**第 1 步：OAuth 同意屏幕**
- 应用名称：`人像换背景`（或你喜欢的名称）
- 用户支持电子邮件：选择你的 Gmail 邮箱
- 应用徽标：可选，暂时跳过
- 应用首页：`http://localhost:3000`（开发环境）
- 应用隐私权政策链接：可选，暂时跳过
- 应用服务条款链接：可选，暂时跳过
- 已获授权的网域：暂时留空
- 开发者联系信息：填写你的邮箱
- 点击「保存并继续」

**第 2 步：范围（Scopes）**
- 点击「添加或移除范围」
- 勾选以下范围：
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
- 点击「更新」
- 点击「保存并继续」

**第 3 步：测试用户**
- 点击「+ ADD USERS」
- 添加你自己的 Gmail 邮箱（用于测试登录）
- 点击「添加」
- 点击「保存并继续」

**第 4 步：摘要**
- 检查信息无误
- 点击「返回信息中心」

## 3. 创建 OAuth 2.0 凭据

### 3.1 进入凭据页面
1. 在左侧菜单中，找到「API 和服务」→「凭据」
2. 或直接访问：https://console.cloud.google.com/apis/credentials

### 3.2 创建 OAuth 客户端 ID
1. 点击顶部「+ 创建凭据」
2. 选择「OAuth 客户端 ID」

### 3.3 配置客户端
- 应用类型：选择「Web 应用」
- 名称：`Web client 1`（或自定义名称）

**已获授权的 JavaScript 来源：**
- 点击「+ 添加 URI」
- 开发环境：`http://localhost:3000`
- 生产环境（如果有）：`https://你的域名.com`

**已获授权的重定向 URI：**
- 点击「+ 添加 URI」
- 开发环境：`http://localhost:3000/api/auth/callback/google`
- 生产环境（如果有）：`https://你的域名.com/api/auth/callback/google`

⚠️ **重要**：重定向 URI 必须精确匹配，包括 `/api/auth/callback/google` 路径

### 3.4 保存并获取凭据
1. 点击「创建」
2. 弹出窗口会显示：
   - **客户端 ID**（类似：`123456789-abc.apps.googleusercontent.com`）
   - **客户端密钥**（类似：`GOCSPX-abc123...`）
3. 复制这两个值（或点击「下载 JSON」保存）
4. 点击「确定」

## 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你从 Google Cloud Console 获取的凭证：

```env
REMOVE_BG_API_KEY=你的remove.bg密钥

# Google OAuth 配置
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123...

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=生成的随机密钥
```

### 生成 NEXTAUTH_SECRET

在终端运行以下命令生成随机密钥：

```bash
openssl rand -base64 32
```

复制输出的字符串，粘贴到 `NEXTAUTH_SECRET` 中。

⚠️ **注意**：
- `.env.local` 文件已在 `.gitignore` 中，不会被提交到 Git
- 生产环境需要将 `NEXTAUTH_URL` 改为你的实际域名

## 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000，右上角会显示「Google 登录」按钮。

## 4. 测试登录流程

1. 点击「Google 登录」按钮
2. 选择你在「测试用户」中添加的 Gmail 账号
3. 授权应用访问你的基本信息
4. 登录成功后，右上角会显示你的名字和「退出」按钮

## 5. 常见问题排查

### 问题 1：redirect_uri_mismatch 错误
**原因**：重定向 URI 不匹配

**解决方法**：
1. 检查 Google Cloud Console 中的「已获授权的重定向 URI」
2. 确保包含：`http://localhost:3000/api/auth/callback/google`
3. 注意：必须完全匹配，包括协议（http/https）、端口号、路径

### 问题 2：Access blocked: This app's request is invalid
**原因**：OAuth 同意屏幕配置不完整

**解决方法**：
1. 返回「OAuth 同意屏幕」
2. 确保填写了必填字段（应用名称、用户支持电子邮件、开发者联系信息）
3. 确保添加了必要的 Scopes

### 问题 3：This app isn't verified
**原因**：应用处于测试模式

**解决方法**：
- 这是正常的，点击「继续」即可
- 只有添加到「测试用户」列表的账号才能登录
- 如果要公开发布，需要提交应用审核（通常不需要）

### 问题 4：环境变量不生效
**解决方法**：
1. 确认 `.env.local` 文件在项目根目录
2. 重启开发服务器（Ctrl+C 然后重新 `npm run dev`）
3. 检查环境变量名称是否正确（区分大小写）

## 已实现的功能

✅ Google OAuth 登录
✅ 显示用户名和头像
✅ 退出登录
✅ 会话持久化

## 可选：添加登录保护

如果你想让某些功能只有登录用户才能使用，可以在组件中检查 session：

```tsx
'use client'
import { useSession } from 'next-auth/react'

export default function ProtectedFeature() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>加载中...</div>
  }

  if (!session) {
    return <div>请先登录才能使用此功能</div>
  }

  return <div>欢迎，{session.user?.name}！</div>
}
```

## 部署到生产环境

### Vercel 部署

1. 在 Vercel 项目设置中添加环境变量：
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL`（改为你的域名，如 `https://yourdomain.com`）
   - `NEXTAUTH_SECRET`

2. 在 Google Cloud Console 中添加生产环境的重定向 URI：
   - `https://yourdomain.com/api/auth/callback/google`

3. 重新部署应用

### Cloudflare Pages 部署

配置方式相同，注意 `NEXTAUTH_URL` 要改为 Cloudflare Pages 分配的域名。

---

**配置完成！** 🎉

有问题随时问我。
