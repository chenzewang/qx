// 游戏主类
class DogLoveGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.dogContainer = document.getElementById('dogContainer');
        this.lineDog = document.getElementById('lineDog');
        
        // 游戏状态
        this.isDrawing = false;
        this.currentLevel = 1;
        this.gameStarted = false;
        this.storyMode = true; // 新增：剧情模式状态
        this.path = [];
        this.stars = [];
        this.connectedStars = [];
        
        // 小狗位置
        this.dogPosition = { x: 400, y: 300 };
        
        // 粒子系统
        this.particles = [];
        this.floatingHearts = [];
        
        // 音效系统
        this.audioContext = null;
        this.sounds = {};
        this.initAudio();
        
        // 关卡配置
        this.levels = [
            {
                title: "画一个爱心 💖",
                description: "初次心动的瞬间",
                targetShape: "heart",
                dogGif: "gif/小白 1.gif", // 小白 - 纯真的爱心
                memoryTitle: "第一次心动",
                memoryText: "还记得第一次见到你时，心跳加速的感觉吗？就像这颗爱心一样，温暖而美好。",
                storyText: "在一个阳光明媚的春日，小白在公园里悠闲地散步。突然，它看到了一只毛茸茸的黄色小狗——小鸡毛！小白的心跳瞬间加速，就像第一次恋爱的感觉。小白害羞地摇着尾巴说：'汪汪...那只黄色的小狗好可爱啊...我的心跳得好快，就像要画出一颗爱心一样！'这就是它们爱情故事的开始...",
                memoryQuotes: [
                    "爱情是两颗心的相遇，不是偶然，而是必然。",
                    "在茫茫人海中，我们相遇了，这就是最美的奇迹。",
                    "第一眼看到你，我就知道，我的心找到了归宿。"
                ],
                memoryColor: "#ff69b4"
            },
            {
                title: "画无穷符号 ∞",
                description: "永恒的承诺",
                targetShape: "infinity",
                dogGif: "gif/小鸡毛 2.gif", // 小鸡毛 - 活泼的无穷符号
                memoryTitle: "永恒的爱",
                memoryText: "我们的爱就像这个无穷符号，没有开始，没有结束，永远循环下去。",
                storyText: "经过几天的相处，小鸡毛和小白越来越熟悉了。今天，小鸡毛鼓起勇气走到小白面前，认真地说：'小白，我想和你在一起，永远永远！'小白感动得眼中闪着泪花：'小鸡毛，我也是！我们的爱情就像无穷符号一样，永远没有尽头！'小鸡毛开心地在原地转圈圈：'汪汪汪！那我们就是正式的情侣啦！'",
                memoryQuotes: [
                    "爱情不是一时的激情，而是一生的承诺。",
                    "无论时光如何流转，我对你的爱永远不变。",
                    "我们的爱情故事，没有结局，只有永恒的续集。"
                ],
                memoryColor: "#9370db"
            },
            {
                title: "画出LOVE字母",
                description: "爱的宣言",
                targetShape: "letters",
                dogGif: "gif/小白 3.gif", // 小白 - 优雅的字母
                memoryTitle: "爱的宣言",
                memoryText: "LOVE，四个字母，承载着世间最美好的情感。",
                storyText: "成为情侣后的小鸡毛和小白每天都腻在一起，甜蜜得不得了！今天是它们在一起的第一个月纪念日，小白羞涩地对小鸡毛说：'小鸡毛，我想大声告诉全世界我爱你！'小鸡毛激动地跳了起来：'汪汪汪！那我们一起画LOVE字母吧！L代表Love爱情，O代表Only唯一，V代表Very非常，E代表Everything一切！你就是我的一切！'",
                memoryQuotes: [
                    "LOVE不只是一个词，而是我们共同的誓言。",
                    "四个字母，无数个美好的回忆。",
                    "从此以后，LOVE就是我们的代名词。"
                ],
                memoryColor: "#ff6347"
            },
            {
                title: "自由创作 ✨",
                description: "专属浪漫",
                targetShape: "free",
                dogGif: "gif/小鸡毛 4.gif", // 小鸡毛 - 自由创作
                memoryTitle: "无限可能",
                memoryText: "爱情没有标准答案，就像你画的图案一样，独一无二，充满惊喜。",
                storyText: "时光飞逝，小鸡毛和小白已经相爱很久了。它们一起经历了春夏秋冬，一起看过日出日落。今天，它们坐在夕阳下，小鸡毛温柔地对小白说：'小白，我们的未来会是什么样子呢？'小白依偎在小鸡毛身边：'不管是什么样子，只要和你在一起就好。我们的爱情就像自由创作一样，没有固定的模式，每一天都是新的惊喜！'它们相视而笑，眼中满含着对未来的憧憬...",
                memoryQuotes: [
                    "爱情是最美的艺术，我们是彼此的艺术家。",
                    "每一天和你在一起，都是新的创作。",
                    "我们的爱情，就像这幅画一样，独一无二，无法复制。"
                ],
                memoryColor: "#ffd700"
            }
        ];
        
        // 个性化内容
        this.personalizedContent = {
            playerNames: ["你", "她"], // 可以自定义
            specialDates: [
                { name: "相识纪念日", date: "2024-02-14" },
                { name: "第一次约会", date: "2024-03-01" },
                { name: "确定关系", date: "2024-04-01" }
            ],
            loveMessages: [
                "愿我们的爱情像星空一样永恒美丽",
                "小狗见证了我们的每一个甜蜜时刻",
                "这个七夕，让线条小狗为我们牵红线",
                "每一颗连接的星星，都是我们爱情的见证"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.generateStars();
        this.bindEvents();
        this.optimizeForMobile();
        this.addErrorHandling();
        this.drawBackground();
        this.drawStars();
        this.updateLevelInfo();
        this.toggleGameMode(); // 初始化时显示剧情模式
        this.startAnimation();
    }
    
    startAnimation() {
        let frameCount = 0;
        const animate = () => {
            if (!this.isDrawing) {
                this.drawBackground();
                this.drawStars();
            }
            this.updateParticles();
            this.updateFloatingHearts();
            
            // 每60帧进行一次性能优化
            frameCount++;
            if (frameCount % 60 === 0) {
                this.optimizePerformance();
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.audioContext = null;
        }
    }
    
    // 错误处理和性能优化
    addErrorHandling() {
        // 全局错误处理
        window.addEventListener('error', (e) => {
            console.error('游戏错误:', e.error);
            this.showErrorMessage('游戏遇到了一些问题，请刷新页面重试。');
        });
        
        // Canvas错误处理
        this.canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            this.showErrorMessage('图形渲染出现问题，请刷新页面。');
        });
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            font-size: 1.1rem;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    // 性能优化
    optimizePerformance() {
        // 限制粒子数量
        if (this.particles.length > 100) {
            this.particles = this.particles.slice(-50);
        }
        
        if (this.floatingHearts.length > 20) {
            this.floatingHearts = this.floatingHearts.slice(-10);
        }
        
        // 限制路径点数量
        if (this.path.length > 500) {
            this.path = this.path.slice(-250);
        }
    }
    
    playSound(frequency, duration = 0.2, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    createParticle(x, y, type = 'sparkle') {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 60,
            maxLife: 60,
            size: Math.random() * 3 + 1,
            type: type,
            color: this.getParticleColor(type),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2
        };
        
        this.particles.push(particle);
    }
    
    getParticleColor(type) {
        switch (type) {
            case 'sparkle':
                return `hsl(${Math.random() * 60 + 300}, 70%, 80%)`;
            case 'star':
                return '#ffd700';
            case 'heart':
                return '#ff69b4';
            case 'magic':
                return `hsl(${Math.random() * 360}, 70%, 80%)`;
            default:
                return '#ffffff';
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // 重力
            particle.life--;
            particle.rotation += particle.rotationSpeed;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    createFloatingHeart(x, y) {
        const heart = {
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vy: -1 - Math.random(),
            life: 120,
            maxLife: 120,
            size: Math.random() * 2 + 2,
            opacity: 1,
            sway: Math.random() * 0.02 + 0.01
        };
        
        this.floatingHearts.push(heart);
    }
    
    updateFloatingHearts() {
        for (let i = this.floatingHearts.length - 1; i >= 0; i--) {
            const heart = this.floatingHearts[i];
            
            heart.y += heart.vy;
            heart.x += Math.sin(heart.life * heart.sway) * 0.5;
            heart.life--;
            heart.opacity = heart.life / heart.maxLife;
            
            if (heart.life <= 0) {
                this.floatingHearts.splice(i, 1);
            }
        }
    }
    
    setupCanvas() {
        // 动态设置canvas尺寸
        const maxWidth = Math.min(800, window.innerWidth - 40);
        const maxHeight = Math.min(600, window.innerHeight - 200);
        
        // 保持16:12的宽高比
        const aspectRatio = 4 / 3;
        let canvasWidth = maxWidth;
        let canvasHeight = maxWidth / aspectRatio;
        
        // 如果高度超出限制，则以高度为准调整宽度
        if (canvasHeight > maxHeight) {
            canvasHeight = maxHeight;
            canvasWidth = maxHeight * aspectRatio;
        }
        
        // 确保最小尺寸
        canvasWidth = Math.max(300, canvasWidth);
        canvasHeight = Math.max(225, canvasHeight);
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        // 设置绘制样式
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }
    
    generateStars() {
        this.stars = [];
        
        // 根据当前关卡生成目标形状的星星
        const currentLevelData = this.levels[this.currentLevel - 1];
        this.generateTargetShapeStars(currentLevelData.targetShape);
        
        // 添加一些背景装饰星星
        const numBackgroundStars = 60;
        for (let i = 0; i < numBackgroundStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                brightness: Math.random() * 0.4 + 0.1,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                color: this.getStarColor(),
                pulsePhase: Math.random() * Math.PI * 2,
                isBackground: true
            });
        }
    }
    
    generateTargetShapeStars(targetShape) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        
        switch (targetShape) {
            case 'heart':
                this.generateHeartStars(centerX, centerY, scale);
                break;
            case 'infinity':
                this.generateInfinityStars(centerX, centerY, scale);
                break;
            case 'letters':
                this.generateLetterStars(centerX, centerY, scale);
                break;
            case 'free':
                this.generateFreeStars(centerX, centerY, scale);
                break;
        }
    }
    
    generateHeartStars(centerX, centerY, scale) {
        const numPoints = 24;
        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * 2 * Math.PI;
            
            // 爱心的参数方程 (优化版本)
            const x = centerX + scale * 0.8 * (16 * Math.pow(Math.sin(t), 3)) / 16;
            const y = centerY - scale * 0.8 * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16;
            
            this.stars.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                size: Math.random() * 3 + 2,
                brightness: Math.random() * 0.3 + 0.7,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                color: '#ff69b4',
                pulsePhase: Math.random() * Math.PI * 2,
                isTarget: true
            });
        }
    }
    
    generateInfinityStars(centerX, centerY, scale) {
        const numPoints = 28;
        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * 2 * Math.PI;
            
            // 无穷符号的参数方程 (优化版本)
            const x = centerX + scale * 0.7 * Math.cos(t) / (1 + Math.pow(Math.sin(t), 2));
            const y = centerY + scale * 0.7 * Math.sin(t) * Math.cos(t) / (1 + Math.pow(Math.sin(t), 2));
            
            this.stars.push({
                x: x + (Math.random() - 0.5) * 12,
                y: y + (Math.random() - 0.5) * 12,
                size: Math.random() * 3 + 2,
                brightness: Math.random() * 0.3 + 0.7,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                color: '#9370db',
                pulsePhase: Math.random() * Math.PI * 2,
                isTarget: true
            });
        }
    }
    
    generateLetterStars(centerX, centerY, scale) {
        // 生成"LOVE"字母形状的星星
        const letters = {
            L: [
                {x: -0.6, y: -0.3}, {x: -0.6, y: -0.1}, {x: -0.6, y: 0.1}, 
                {x: -0.6, y: 0.3}, {x: -0.4, y: 0.3}, {x: -0.2, y: 0.3}
            ],
            O: [
                {x: -0.1, y: -0.3}, {x: 0.1, y: -0.3}, {x: 0.2, y: -0.1}, 
                {x: 0.2, y: 0.1}, {x: 0.1, y: 0.3}, {x: -0.1, y: 0.3}, 
                {x: -0.2, y: 0.1}, {x: -0.2, y: -0.1}
            ],
            V: [
                {x: 0.3, y: -0.3}, {x: 0.35, y: -0.1}, {x: 0.4, y: 0.1}, 
                {x: 0.45, y: 0.3}, {x: 0.55, y: 0.3}, {x: 0.6, y: 0.1}, 
                {x: 0.65, y: -0.1}, {x: 0.7, y: -0.3}
            ],
            E: [
                {x: 0.8, y: -0.3}, {x: 0.8, y: -0.1}, {x: 0.8, y: 0.1}, 
                {x: 0.8, y: 0.3}, {x: 1.0, y: -0.3}, {x: 0.9, y: 0}, {x: 1.0, y: 0.3}
            ]
        };
        
        // 合并所有字母的点
        const allPoints = [...letters.L, ...letters.O, ...letters.V, ...letters.E];
        
        allPoints.forEach(point => {
            this.stars.push({
                x: centerX + point.x * scale * 0.8 + (Math.random() - 0.5) * 12,
                y: centerY + point.y * scale * 0.8 + (Math.random() - 0.5) * 12,
                size: Math.random() * 3 + 2,
                brightness: Math.random() * 0.3 + 0.7,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.015 + 0.005,
                color: '#ff6347',
                pulsePhase: Math.random() * Math.PI * 2,
                isTarget: true
            });
        });
    }
    
    generateFreeStars(centerX, centerY, scale) {
        // 自由创作模式 - 生成一些随机但有趣的图案
        const patterns = [
            // 星形图案
            () => {
                for (let i = 0; i < 10; i++) {
                    const angle = (i / 10) * 2 * Math.PI;
                    const radius = scale * (i % 2 === 0 ? 0.8 : 0.4);
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    this.stars.push({
                        x: x + (Math.random() - 0.5) * 10,
                        y: y + (Math.random() - 0.5) * 10,
                        size: Math.random() * 3 + 2,
                        brightness: Math.random() * 0.3 + 0.7,
                        twinkle: Math.random() * Math.PI * 2,
                        twinkleSpeed: Math.random() * 0.015 + 0.005,
                        color: '#ffd700',
                        pulsePhase: Math.random() * Math.PI * 2,
                        isTarget: true
                    });
                }
            }
        ];
        
        // 随机选择一个图案
        const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
        selectedPattern();
    }
    
    getStarColor() {
        const colors = ['white', '#e6f3ff', '#fff2e6', '#f0e6ff', '#e6ffe6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    bindEvents() {
        // 鼠标事件
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseleave', () => this.stopDrawing());
        
        // 触摸事件
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
        
        // 按钮事件
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearPath());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        
        // 剧情按钮事件
        document.getElementById('startChallengeBtn').addEventListener('click', () => this.startChallenge());
        document.getElementById('skipStoryBtn').addEventListener('click', () => this.skipStory());
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    
    startDrawing(e) {
        if (!this.gameStarted) return;
        
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.path = [pos];
        this.dogPosition = { ...pos };
        this.updateDogPosition();
        this.addDogAnimation('dog-running');
    }
    
    draw(e) {
        if (!this.isDrawing || !this.gameStarted) return;
        
        const pos = this.getMousePos(e);
        this.path.push(pos);
        this.dogPosition = { ...pos };
        this.updateDogPosition();
        
        this.drawPath();
        this.checkStarCollisions(pos);
        this.updateProgress();
    }
    
    updateProgress() {
        // 实时检查进度并给予反馈
        const currentLevelData = this.levels[this.currentLevel - 1];
        const starsConnected = this.connectedStars.length;
        const pathLength = this.path.length;
        
        // 更新关卡标题显示进度
        let progressText = currentLevelData.title;
        
        if (starsConnected > 0) {
            progressText += ` (已连接 ${starsConnected} 颗星星)`;
        }
        
        if (pathLength >= 30 && starsConnected >= 3) {
            // 检查图案识别进度
            let shapeProgress = this.getShapeProgress(currentLevelData.targetShape);
            if (shapeProgress > 0) {
                progressText += ` - 图案匹配度: ${Math.round(shapeProgress * 100)}%`;
            }
        }
        
        document.getElementById('levelTitle').textContent = progressText;
    }
    
    getShapeProgress(targetShape) {
        if (this.path.length < 15) return 0;
        
        switch (targetShape) {
            case 'heart':
                return this.getHeartProgress();
            case 'infinity':
                return this.getInfinityProgress();
            case 'letters':
                return this.getLettersProgress();
            case 'free':
                return Math.min(this.path.length / 50, 1); // 自由创作基于路径长度
            default:
                return 0;
        }
    }
    
    getHeartProgress() {
        const bounds = this.getPathBounds();
        if (bounds.width === 0 || bounds.height === 0) return 0;
        
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        let topPoints = 0;
        let bottomPoints = 0;
        let leftCurve = 0;
        let rightCurve = 0;
        
        this.path.forEach(point => {
            const relativeX = point.x - centerX;
            const relativeY = point.y - centerY;
            
            if (relativeY < -bounds.height * 0.2) {
                if (relativeX < -bounds.width * 0.1) leftCurve++;
                if (relativeX > bounds.width * 0.1) rightCurve++;
                topPoints++;
            }
            
            if (relativeY > bounds.height * 0.2 && Math.abs(relativeX) < bounds.width * 0.2) {
                bottomPoints++;
            }
        });
        
        const topScore = Math.min(topPoints / (this.path.length * 0.3), 1);
        const bottomScore = Math.min(bottomPoints / (this.path.length * 0.1), 1);
        const curveScore = (leftCurve > 0 && rightCurve > 0) ? 1 : 0;
        
        return (topScore + bottomScore + curveScore) / 3;
    }
    
    getInfinityProgress() {
        const bounds = this.getPathBounds();
        if (bounds.width === 0 || bounds.height === 0) return 0;
        
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        let leftLoop = 0;
        let rightLoop = 0;
        let crossings = 0;
        
        this.path.forEach(point => {
            const relativeX = point.x - centerX;
            const relativeY = point.y - centerY;
            
            if (relativeX < -bounds.width * 0.1) leftLoop++;
            if (relativeX > bounds.width * 0.1) rightLoop++;
            if (Math.abs(relativeX) < bounds.width * 0.1 && Math.abs(relativeY) < bounds.height * 0.2) {
                crossings++;
            }
        });
        
        const leftScore = Math.min(leftLoop / (this.path.length * 0.2), 1);
        const rightScore = Math.min(rightLoop / (this.path.length * 0.2), 1);
        const crossScore = Math.min(crossings / (this.path.length * 0.1), 1);
        
        return (leftScore + rightScore + crossScore) / 3;
    }
    
    getLettersProgress() {
        let corners = 0;
        let straightLines = 0;
        
        for (let i = 1; i < this.path.length - 1; i++) {
            const prev = this.path[i - 1];
            const curr = this.path[i];
            const next = this.path[i + 1];
            
            const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
            const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
            const angleDiff = Math.abs(angle1 - angle2);
            
            if (angleDiff > Math.PI / 3) corners++;
            if (angleDiff < Math.PI / 6) straightLines++;
        }
        
        const cornerScore = Math.min(corners / 2, 1);
        const lineScore = Math.min(straightLines / (this.path.length * 0.3), 1);
        
        return (cornerScore + lineScore) / 2;
    }
    
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        this.removeDogAnimation('dog-running');
        
        // 检查是否完成了目标图案
        setTimeout(() => {
            this.checkLevelCompletion();
        }, 500);
    }
    
    drawBackground() {
        // 清除画布
        this.ctx.fillStyle = '#0f1419';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制主要渐变背景
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.3, '#16213e');
        gradient.addColorStop(0.7, '#0f1419');
        gradient.addColorStop(1, '#0a0a0f');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 添加银河效果
        this.drawMilkyWay();
        
        // 添加浪漫的光晕效果
        this.drawRomanticGlow();
    }
    
    drawMilkyWay() {
        this.ctx.save();
        
        // 创建银河渐变
        const milkyWayGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        milkyWayGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        milkyWayGradient.addColorStop(0.3, 'rgba(200, 200, 255, 0.05)');
        milkyWayGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
        milkyWayGradient.addColorStop(0.7, 'rgba(200, 200, 255, 0.05)');
        milkyWayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = milkyWayGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.restore();
    }
    
    drawRomanticGlow() {
        this.ctx.save();
        
        // 添加几个浪漫的光晕点
        const glowPoints = [
            { x: this.canvas.width * 0.2, y: this.canvas.height * 0.3, color: 'rgba(255, 182, 193, 0.1)' },
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.7, color: 'rgba(255, 192, 203, 0.08)' },
            { x: this.canvas.width * 0.6, y: this.canvas.height * 0.2, color: 'rgba(255, 218, 185, 0.06)' }
        ];
        
        glowPoints.forEach(point => {
            const glowGradient = this.ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, 150
            );
            glowGradient.addColorStop(0, point.color);
            glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.fillStyle = glowGradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });
        
        this.ctx.restore();
    }
    
    drawStars() {
        this.ctx.save();
        
        this.stars.forEach((star, index) => {
            // 更新闪烁效果
            star.twinkle += star.twinkleSpeed;
            star.pulsePhase += 0.01;
            
            // 计算闪烁透明度
            const twinkleAlpha = star.brightness + Math.sin(star.twinkle) * 0.4;
            const pulseSize = star.size + Math.sin(star.pulsePhase) * 0.5;
            
            // 检查是否被连接
            const isConnected = this.connectedStars.includes(index);
            
            // 设置星星颜色
            let starColor = star.color;
            if (isConnected) {
                starColor = '#ffd700';
            }
            
            // 绘制星星光晕（特殊星星或连接的星星）
            if (star.isSpecial || isConnected) {
                this.ctx.shadowColor = starColor;
                this.ctx.shadowBlur = 15;
                this.ctx.fillStyle = this.hexToRgba(starColor, twinkleAlpha * 0.3);
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, pulseSize + 8, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
            
            // 绘制星星主体
            this.ctx.fillStyle = this.hexToRgba(starColor, twinkleAlpha);
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 绘制星星十字光芒（特殊星星）
            if (star.isSpecial) {
                this.drawStarCross(star.x, star.y, pulseSize + 3, starColor, twinkleAlpha * 0.8);
            }
            
            // 连接的星星额外效果
            if (isConnected) {
                this.drawStarCross(star.x, star.y, pulseSize + 2, '#ffd700', twinkleAlpha * 0.6);
                
                // 绘制连接粒子效果
                this.ctx.fillStyle = this.hexToRgba('#ffd700', twinkleAlpha * 0.5);
                for (let i = 0; i < 3; i++) {
                    const angle = (Date.now() * 0.001 + i * Math.PI * 2 / 3) % (Math.PI * 2);
                    const radius = pulseSize + 6;
                    const px = star.x + Math.cos(angle) * radius;
                    const py = star.y + Math.sin(angle) * radius;
                    this.ctx.beginPath();
                    this.ctx.arc(px, py, 1, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        });
        
        this.ctx.restore();
    }
    
    drawStarCross(x, y, size, color, alpha) {
        this.ctx.save();
        this.ctx.strokeStyle = this.hexToRgba(color, alpha);
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        
        // 绘制十字光芒
        this.ctx.beginPath();
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x + size, y);
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    hexToRgba(hex, alpha) {
        if (hex === 'white') return `rgba(255, 255, 255, ${alpha})`;
        if (hex === 'gold') return `rgba(255, 215, 0, ${alpha})`;
        if (hex.startsWith('#')) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return `rgba(255, 255, 255, ${alpha})`;
    }
    
    drawPath() {
        if (this.path.length < 2) return;
        
        this.drawBackground();
        this.drawStars();
        
        // 绘制轨迹主线
        this.drawMainTrail();
        
        // 绘制轨迹光晕效果
        this.drawTrailGlow();
        
        // 绘制爱心粒子效果
        this.drawHeartParticles();
        
        // 绘制轨迹端点效果
        this.drawTrailEndpoint();
        
        // 绘制粒子系统
        this.drawParticles();
        
        // 绘制漂浮爱心
        this.drawFloatingHearts();
    }
    
    drawParticles() {
        this.ctx.save();
        
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.globalAlpha = alpha;
            
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            switch (particle.type) {
                case 'sparkle':
                    this.drawSparkle(0, 0, particle.size, particle.color);
                    break;
                case 'star':
                    this.drawStar(0, 0, particle.size, particle.color);
                    break;
                case 'heart':
                    this.drawHeart(0, 0, particle.size, particle.color);
                    break;
                case 'magic':
                    this.drawMagicParticle(0, 0, particle.size, particle.color);
                    break;
            }
            
            this.ctx.restore();
        });
        
        this.ctx.restore();
    }
    
    drawSparkle(x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加十字光芒
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 2, y);
        this.ctx.lineTo(x + size * 2, y);
        this.ctx.moveTo(x, y - size * 2);
        this.ctx.lineTo(x, y + size * 2);
        this.ctx.stroke();
    }
    
    drawMagicParticle(x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加魔法光环
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    drawFloatingHearts() {
        this.ctx.save();
        
        this.floatingHearts.forEach(heart => {
            this.ctx.globalAlpha = heart.opacity;
            this.drawHeart(heart.x, heart.y, heart.size, `rgba(255, 182, 193, ${heart.opacity})`);
        });
        
        this.ctx.restore();
    }
    
    drawMainTrail() {
        this.ctx.save();
        
        // 创建渐变轨迹
        const gradient = this.ctx.createLinearGradient(
            this.path[0].x, this.path[0].y,
            this.path[this.path.length - 1].x, this.path[this.path.length - 1].y
        );
        gradient.addColorStop(0, '#ff69b4');
        gradient.addColorStop(0.5, '#ff1493');
        gradient.addColorStop(1, '#ff69b4');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 4;
        this.ctx.shadowColor = '#ff69b4';
        this.ctx.shadowBlur = 15;
        
        // 使用贝塞尔曲线绘制平滑轨迹
        this.ctx.beginPath();
        this.ctx.moveTo(this.path[0].x, this.path[0].y);
        
        for (let i = 1; i < this.path.length - 1; i++) {
            const currentPoint = this.path[i];
            const nextPoint = this.path[i + 1];
            const controlX = (currentPoint.x + nextPoint.x) / 2;
            const controlY = (currentPoint.y + nextPoint.y) / 2;
            
            this.ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, controlX, controlY);
        }
        
        if (this.path.length > 1) {
            const lastPoint = this.path[this.path.length - 1];
            this.ctx.lineTo(lastPoint.x, lastPoint.y);
        }
        
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    drawTrailGlow() {
        if (this.path.length < 5) return;
        
        this.ctx.save();
        
        // 绘制外层光晕
        this.ctx.strokeStyle = 'rgba(255, 105, 180, 0.3)';
        this.ctx.lineWidth = 12;
        this.ctx.shadowColor = '#ff69b4';
        this.ctx.shadowBlur = 25;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.path[0].x, this.path[0].y);
        
        for (let i = 1; i < this.path.length; i++) {
            this.ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        
        this.ctx.stroke();
        
        // 绘制内层光晕
        this.ctx.strokeStyle = 'rgba(255, 182, 193, 0.5)';
        this.ctx.lineWidth = 8;
        this.ctx.shadowBlur = 15;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.path[0].x, this.path[0].y);
        
        for (let i = 1; i < this.path.length; i++) {
            this.ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    drawTrailEndpoint() {
        if (this.path.length === 0) return;
        
        const lastPoint = this.path[this.path.length - 1];
        
        this.ctx.save();
        
        // 绘制端点光晕
        const glowGradient = this.ctx.createRadialGradient(
            lastPoint.x, lastPoint.y, 0,
            lastPoint.x, lastPoint.y, 20
        );
        glowGradient.addColorStop(0, 'rgba(255, 105, 180, 0.8)');
        glowGradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.4)');
        glowGradient.addColorStop(1, 'rgba(255, 105, 180, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(lastPoint.x, lastPoint.y, 20, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制端点核心
        this.ctx.fillStyle = '#ff1493';
        this.ctx.shadowColor = '#ff69b4';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(lastPoint.x, lastPoint.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawHeartParticles() {
        if (this.path.length < 10) return;
        
        this.ctx.save();
        
        // 在轨迹上生成多种粒子效果
        for (let i = 0; i < this.path.length; i += 8) {
            const point = this.path[i];
            
            // 爱心粒子
            if (Math.random() < 0.4) {
                const size = 2 + Math.random() * 3;
                const alpha = 0.4 + Math.random() * 0.4;
                this.drawHeart(point.x + (Math.random() - 0.5) * 10, 
                              point.y + (Math.random() - 0.5) * 10, 
                              size, `rgba(255, 182, 193, ${alpha})`);
            }
            
            // 星星粒子
            if (Math.random() < 0.2) {
                const size = 1 + Math.random() * 2;
                const alpha = 0.5 + Math.random() * 0.3;
                this.drawStar(point.x + (Math.random() - 0.5) * 15, 
                             point.y + (Math.random() - 0.5) * 15, 
                             size, `rgba(255, 255, 255, ${alpha})`);
            }
            
            // 光点粒子
            if (Math.random() < 0.6) {
                const size = 1 + Math.random() * 2;
                const alpha = 0.3 + Math.random() * 0.5;
                const hue = 300 + Math.random() * 60; // 粉色到紫色
                this.ctx.fillStyle = `hsla(${hue}, 70%, 80%, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(point.x + (Math.random() - 0.5) * 12, 
                           point.y + (Math.random() - 0.5) * 12, 
                           size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        this.ctx.restore();
    }
    
    drawStar(x, y, size, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.translate(x, y);
        this.ctx.scale(size / 5, size / 5);
        
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 144 - 90) * Math.PI / 180;
            const x = Math.cos(angle) * 5;
            const y = Math.sin(angle) * 5;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawHeart(x, y, size, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.translate(x, y);
        this.ctx.scale(size / 10, size / 10);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 3);
        this.ctx.bezierCurveTo(-5, -2, -10, 1, 0, 10);
        this.ctx.bezierCurveTo(10, 1, 5, -2, 0, 3);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    checkStarCollisions(pos) {
        this.stars.forEach((star, index) => {
            const distance = Math.sqrt(
                Math.pow(pos.x - star.x, 2) + Math.pow(pos.y - star.y, 2)
            );
            
            if (distance < 20 && !this.connectedStars.includes(index)) {
                this.connectedStars.push(index);
                this.createStarEffect(star.x, star.y);
                
                // 播放星星连接音效
                this.playSound(800 + Math.random() * 400, 0.3, 'sine');
                
                // 创建粒子效果
                for (let i = 0; i < 8; i++) {
                    this.createParticle(star.x, star.y, 'sparkle');
                }
                
                // 创建漂浮爱心
                this.createFloatingHeart(star.x, star.y);
            }
        });
    }
    
    createStarEffect(x, y) {
        // 创建星星连接特效
        const particles = [];
        for (let i = 0; i < 8; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30
            });
        }
        
        const animateParticles = () => {
            this.ctx.save();
            this.ctx.fillStyle = '#ffd700';
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;
                
                if (particle.life > 0) {
                    this.ctx.globalAlpha = particle.life / 30;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                } else {
                    particles.splice(index, 1);
                }
            });
            
            this.ctx.restore();
            
            if (particles.length > 0) {
                requestAnimationFrame(animateParticles);
            }
        };
        
        animateParticles();
    }
    
    updateDogPosition() {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = rect.width / this.canvas.width;
        const scaleY = rect.height / this.canvas.height;
        
        this.dogContainer.style.left = (this.dogPosition.x * scaleX) + 'px';
        this.dogContainer.style.top = (this.dogPosition.y * scaleY) + 'px';
    }
    
    // 优化移动设备体验
    optimizeForMobile() {
        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // 禁用双击缩放
            document.addEventListener('touchstart', (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // 禁用长按菜单
            this.canvas.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
            
            // 优化触摸响应
            this.canvas.style.touchAction = 'none';
            
            // 添加触摸反馈
            this.addTouchFeedback();
        }
    }
    
    addTouchFeedback() {
        // 添加触摸开始的视觉反馈
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameStarted) {
                this.canvas.style.filter = 'brightness(1.1)';
            }
        });
        
        // 移除触摸反馈
        this.canvas.addEventListener('touchend', (e) => {
            this.canvas.style.filter = 'brightness(1)';
        });
    }
    
    addDogAnimation(className) {
        this.lineDog.classList.add(className);
    }
    
    removeDogAnimation(className) {
        this.lineDog.classList.remove(className);
    }
    
    checkLevelCompletion() {
        const currentLevelData = this.levels[this.currentLevel - 1];
        let completed = false;
        
        // 检查是否满足基本条件
        if (this.connectedStars.length >= 3 && this.path.length >= 30) {
            // 根据关卡类型进行图案识别
            switch (currentLevelData.targetShape) {
                case 'heart':
                    completed = this.recognizeHeart();
                    break;
                case 'infinity':
                    completed = this.recognizeInfinity();
                    break;
                case 'letters':
                    completed = this.recognizeLetters();
                    break;
                case 'free':
                    completed = true; // 自由创作关卡
                    break;
                default:
                    completed = this.connectedStars.length >= 5;
            }
        }
        
        if (completed) {
            this.addDogAnimation('dog-happy');
            
            // 播放成功音效
            this.playSuccessSound();
            
            // 创建庆祝粒子效果
            this.createCelebrationEffect();
            
            setTimeout(() => {
                this.removeDogAnimation('dog-happy');
                this.showMemoryModal(currentLevelData);
            }, 1000);
        }
    }
    
    playSuccessSound() {
        // 播放成功的和弦音效
        const notes = [523, 659, 784]; // C, E, G
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playSound(note, 0.5, 'sine');
            }, index * 100);
        });
    }
    
    createCelebrationEffect() {
        // 在画布中心创建庆祝效果
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 创建爆炸式粒子效果
        for (let i = 0; i < 30; i++) {
            this.createParticle(centerX, centerY, 'magic');
        }
        
        // 创建多个漂浮爱心
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createFloatingHeart(
                    centerX + (Math.random() - 0.5) * 200,
                    centerY + (Math.random() - 0.5) * 200
                );
            }, i * 100);
        }
    }
    
    recognizeHeart() {
        if (this.path.length < 20) return false;
        
        // 获取路径的边界框
        const bounds = this.getPathBounds();
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        // 检查是否有心形的特征
        let topPoints = 0;
        let bottomPoints = 0;
        let leftCurve = 0;
        let rightCurve = 0;
        
        this.path.forEach(point => {
            const relativeX = point.x - centerX;
            const relativeY = point.y - centerY;
            
            // 检查顶部两个凸起
            if (relativeY < -bounds.height * 0.2) {
                if (relativeX < -bounds.width * 0.1) leftCurve++;
                if (relativeX > bounds.width * 0.1) rightCurve++;
                topPoints++;
            }
            
            // 检查底部尖点
            if (relativeY > bounds.height * 0.2 && Math.abs(relativeX) < bounds.width * 0.2) {
                bottomPoints++;
            }
        });
        
        // 心形判断条件
        return topPoints > this.path.length * 0.3 && 
               bottomPoints > this.path.length * 0.1 && 
               leftCurve > 0 && rightCurve > 0;
    }
    
    recognizeInfinity() {
        if (this.path.length < 30) return false;
        
        const bounds = this.getPathBounds();
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        // 检查是否有无穷符号的特征（两个交叉的环）
        let leftLoop = 0;
        let rightLoop = 0;
        let crossings = 0;
        
        this.path.forEach((point) => {
            const relativeX = point.x - centerX;
            const relativeY = point.y - centerY;
            
            // 检查左右环
            if (relativeX < -bounds.width * 0.1) leftLoop++;
            if (relativeX > bounds.width * 0.1) rightLoop++;
            
            // 检查中心交叉
            if (Math.abs(relativeX) < bounds.width * 0.1 && Math.abs(relativeY) < bounds.height * 0.2) {
                crossings++;
            }
        });
        
        // 无穷符号判断条件
        return leftLoop > this.path.length * 0.2 && 
               rightLoop > this.path.length * 0.2 && 
               crossings > this.path.length * 0.1;
    }
    
    recognizeLetters() {
        if (this.path.length < 15) return false;
        
        // 简化的字母识别：检查是否有明显的直线和转角
        let corners = 0;
        let straightLines = 0;
        
        for (let i = 1; i < this.path.length - 1; i++) {
            const prev = this.path[i - 1];
            const curr = this.path[i];
            const next = this.path[i + 1];
            
            // 计算角度变化
            const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
            const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
            const angleDiff = Math.abs(angle1 - angle2);
            
            if (angleDiff > Math.PI / 3) corners++; // 60度以上的转角
            if (angleDiff < Math.PI / 6) straightLines++; // 30度以下的直线
        }
        
        // 字母判断条件
        return corners >= 2 && straightLines > this.path.length * 0.3;
    }
    
    getPathBounds() {
        if (this.path.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };
        
        let minX = this.path[0].x;
        let maxX = this.path[0].x;
        let minY = this.path[0].y;
        let maxY = this.path[0].y;
        
        this.path.forEach(point => {
            minX = Math.min(minX, point.x);
            maxX = Math.max(maxX, point.x);
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
        });
        
        return {
            minX, maxX, minY, maxY,
            width: maxX - minX,
            height: maxY - minY
        };
    }
    
    showMemoryModal(levelData) {
        const modal = document.getElementById('memoryModal');
        const title = document.getElementById('memoryTitle');
        const text = document.getElementById('memoryText');
        const modalContent = modal.querySelector('.modal-content');
        
        // 设置主题色
        modalContent.style.background = `linear-gradient(135deg, ${levelData.memoryColor}aa 0%, ${levelData.memoryColor}66 100%)`;
        
        title.textContent = levelData.memoryTitle;
        
        // 随机选择一句情话
        const randomQuote = levelData.memoryQuotes[Math.floor(Math.random() * levelData.memoryQuotes.length)];
        text.innerHTML = `
            <div class="memory-main-text">${levelData.memoryText}</div>
            <div class="memory-quote">"${randomQuote}"</div>
            <div class="memory-personalized">${this.getPersonalizedMessage()}</div>
        `;
        
        // 添加动画效果
        modal.style.display = 'block';
        this.animateModalContent(modalContent);
    }
    
    getPersonalizedMessage() {
        const messages = this.personalizedContent.loveMessages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // 添加当前日期信息
        const today = new Date();
        const dateStr = today.toLocaleDateString('zh-CN');
        
        return `<br><small>💕 ${randomMessage}<br>📅 ${dateStr} - 七夕特别纪念</small>`;
    }
    
    animateModalContent(modalContent) {
        // 添加进入动画
        modalContent.style.transform = 'translate(-50%, -60%) scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            modalContent.style.opacity = '1';
        }, 50);
        
        // 添加浮动爱心效果
        this.createModalHeartEffect();
    }
    
    createModalHeartEffect() {
        const modal = document.getElementById('memoryModal');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '100%';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.opacity = '0.8';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1001';
                heart.style.transition = 'all 3s ease-out';
                
                modal.appendChild(heart);
                
                // 动画效果
                setTimeout(() => {
                    heart.style.top = '-50px';
                    heart.style.opacity = '0';
                    heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
                }, 50);
                
                // 清理
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 3000);
            }, i * 200);
        }
    }
    
    closeModal() {
        document.getElementById('memoryModal').style.display = 'none';
    }
    
    nextLevel() {
        this.closeModal();
        
        if (this.currentLevel < this.levels.length) {
            this.currentLevel++;
            this.clearPath();
            
            // 重新生成当前关卡的星星
            this.generateStars();
            
            // 重新进入剧情模式
            this.storyMode = true;
            this.gameStarted = false;
            
            this.updateLevelInfo();
            this.toggleGameMode();
            
            // 重置开始按钮状态
            const startBtn = document.getElementById('startBtn');
            startBtn.textContent = '开始游戏';
            startBtn.disabled = false;
        } else {
            // 游戏完成
            this.showGameCompletionCelebration();
        }
    }
    
    updateLevelInfo() {
        const currentLevelData = this.levels[this.currentLevel - 1];
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('levelTitle').textContent = currentLevelData.title;
        
        // 更新小狗GIF
        this.updateDogGif(currentLevelData.dogGif);
        
        // 更新剧情文本
        this.updateStoryText(currentLevelData.storyText, currentLevelData.dogGif);
    }
    
    updateDogGif(gifPath) {
        const lineDog = document.getElementById('lineDog');
        const storyDogImage = document.getElementById('storyDogImage');
        
        if (lineDog) {
            lineDog.src = gifPath;
        }
        if (storyDogImage) {
            storyDogImage.src = gifPath;
        }
    }
    
    updateStoryText(storyText, dogGif) {
        const storyTextElement = document.getElementById('storyText');
        const storyPanel = document.getElementById('storyPanel');
        
        if (storyTextElement && storyPanel) {
            // 添加淡出效果
            storyPanel.style.opacity = '0';
            storyPanel.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                storyTextElement.textContent = storyText;
                
                // 添加淡入效果
                storyPanel.style.transition = 'all 0.5s ease';
                storyPanel.style.opacity = '1';
                storyPanel.style.transform = 'translateY(0)';
                
                // 重新触发动画
                storyPanel.style.animation = 'none';
                setTimeout(() => {
                    storyPanel.style.animation = 'storyFadeIn 1s ease-in-out';
                }, 10);
            }, 300);
        }
    }
    
    startChallenge() {
        // 从剧情模式切换到游戏模式
        this.storyMode = false;
        this.gameStarted = true;
        
        // 隐藏剧情面板，显示控制面板
        this.toggleGameMode();
        
        // 重置小狗位置到中心
        this.dogPosition = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.updateDogPosition();
        
        // 播放开始音效
        this.playSound(523, 0.3, 'sine');
    }
    
    skipStory() {
        // 跳过剧情，直接进入游戏
        this.startChallenge();
    }
    
    toggleGameMode() {
        const storyPanel = document.getElementById('storyPanel');
        const controlPanel = document.querySelector('.control-panel');
        
        if (this.storyMode) {
            // 显示剧情模式
            storyPanel.style.display = 'block';
            controlPanel.style.display = 'none';
        } else {
            // 显示游戏模式
            storyPanel.style.display = 'none';
            controlPanel.style.display = 'block';
        }
    }
    
    startGame() {
        // 保持原有的开始游戏逻辑，但现在只在非剧情模式下使用
        if (!this.storyMode) {
            this.gameStarted = true;
            document.getElementById('startBtn').textContent = '游戏进行中...';
            document.getElementById('startBtn').disabled = true;
            
            // 重置小狗位置到中心
            this.dogPosition = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
            this.updateDogPosition();
        }
    }
    
    clearPath() {
        this.path = [];
        this.connectedStars = [];
        this.drawBackground();
        this.drawStars();
        
        // 重置小狗位置
        this.dogPosition = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.updateDogPosition();
    }
    
    showHint() {
        const currentLevelData = this.levels[this.currentLevel - 1];
        let hintText = `💡 提示：${currentLevelData.description}\n\n`;
        
        switch (currentLevelData.targetShape) {
            case 'heart':
                hintText += '画一个爱心形状 💖：\n• 跟随粉色的目标星星轮廓\n• 从上方开始画两个圆弧\n• 在底部汇聚成一个尖点\n• 连接足够多的目标星星';
                break;
            case 'infinity':
                hintText += '画一个无穷符号 ∞：\n• 跟随紫色的目标星星轮廓\n• 画一个横向的8字形\n• 确保有两个环形\n• 在中间有交叉点';
                break;
            case 'letters':
                hintText += '画出LOVE字母 💕：\n• 跟随橙红色的目标星星轮廓\n• 依次连接L-O-V-E四个字母\n• 每个字母都有清晰的形状\n• 表达你们的爱意宣言！';
                break;
            case 'free':
                hintText += '自由创作 ✨：\n• 跟随金色的目标星星轮廓\n• 画出任何你想表达的图案\n• 可以是星形、花朵或抽象艺术\n• 让爱意自由流淌！';
                break;
        }
        
        alert(hintText);
    }
    
    resetGame() {
        this.currentLevel = 1;
        this.gameStarted = false;
        this.clearPath();
        
        // 重新生成第一关的星星
        this.generateStars();
        
        // 重新进入剧情模式
        this.storyMode = true;
        
        this.updateLevelInfo();
        this.toggleGameMode();
        
        document.getElementById('startBtn').textContent = '开始游戏';
        document.getElementById('startBtn').disabled = false;
    }
    
    handleResize() {
        // 重新设置画布尺寸
        this.setupCanvas();
        
        // 重新生成星星（因为画布尺寸改变了）
        this.generateStars();
        
        // 重新绘制
        this.drawBackground();
        this.drawStars();
        
        // 更新小狗位置
        this.dogPosition = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.updateDogPosition();
        
        // 清除当前路径
        this.path = [];
        this.connectedStars = [];
    }
    
    showGameCompletionCelebration() {
        // 创建特殊的游戏完成庆祝界面
        const celebrationModal = document.createElement('div');
        celebrationModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
        `;
        
        celebrationModal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                color: white;
                max-width: 500px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: bounceIn 0.8s ease;
            ">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    🎉 恭喜完成所有关卡！ 🎉
                </h1>
                
                <div style="margin: 30px 0;">
                    <img src="gif/小鸡毛和小白 1.gif" alt="小鸡毛和小白一起庆祝" 
                         style="width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                </div>
                
                <p style="font-size: 1.3rem; margin-bottom: 20px; line-height: 1.6;">
                    情侣小鸡毛和小白一起为你们庆祝！<br>
                    愿你们的爱情像星空一样永恒美丽！
                </p>
                
                <div style="background: rgba(255,255,255,0.2); border-radius: 15px; padding: 20px; margin: 20px 0;">
                    <p style="font-style: italic; font-size: 1.1rem;">
                        "汪汪汪！作为相爱的情侣，我们见证了你们画出的每一颗爱心、每一个无穷符号、每一个LOVE字母！<br>
                        你们的爱情就像我们的爱情一样，闪闪发光，永远美丽！我们都是爱情的见证者！"<br>
                        <small>—— 情侣小鸡毛 & 小白</small>
                    </p>
                </div>
                
                <button id="restartGameBtn" 
                        style="
                            background: linear-gradient(45deg, #ffd700, #ffed4e);
                            color: #333;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 25px;
                            font-size: 1.1rem;
                            font-weight: bold;
                            cursor: pointer;
                            margin-top: 20px;
                            box-shadow: 0 5px 15px rgba(255,215,0,0.4);
                            transition: all 0.3s ease;
                        "
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(255,215,0,0.6)';"
                        onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 5px 15px rgba(255,215,0,0.4)';">
                    🌟 重新开始浪漫之旅 🌟
                </button>
            </div>
        `;
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(celebrationModal);
        
        // 添加重新开始按钮事件
        document.getElementById('restartGameBtn').addEventListener('click', () => {
            celebrationModal.remove();
            this.resetGame();
        });
        
        // 播放庆祝音效
        this.playSound(523, 0.3, 'sine');
        setTimeout(() => this.playSound(659, 0.3, 'sine'), 200);
        setTimeout(() => this.playSound(784, 0.3, 'sine'), 400);
        setTimeout(() => this.playSound(1047, 0.5, 'sine'), 600);
        
        // 创建庆祝粒子效果
        this.createCelebrationEffect();
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new DogLoveGame();
    
    // 添加窗口大小改变事件
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            game.handleResize();
        }, 250);
    });
});