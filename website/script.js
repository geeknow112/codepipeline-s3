// CodePipeline S3 Demo JavaScript - v2.3.0 Expandable Sections

document.addEventListener('DOMContentLoaded', function() {
    // 現在の日時を表示
    updateTimestamp();
    
    // 5秒ごとにタイムスタンプを更新
    setInterval(updateTimestamp, 5000);
    
    // デプロイ成功のアニメーション
    animateDeployStatus();
    
    // インタラクティブアニメーション
    initInteractiveAnimations();
    
    // 新機能: 展開可能セクション
    initExpandableSections();
    
    // パーティクルエフェクト
    createParticleEffect();
    
    console.log('🎯 Expandable Sections Added - v2.3.0 - ' + new Date().toISOString());
});

function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    const now = new Date();
    const formattedTime = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    if (timestampElement) {
        timestampElement.textContent = `最終更新: ${formattedTime}`;
    }
}

function animateDeployStatus() {
    const badge = document.querySelector('.badge.success');
    if (badge) {
        // フェードインアニメーション
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'all 0.5s ease-in-out';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 100);
    }
}

// 新機能: 展開可能セクションの初期化
function initExpandableSections() {
    const headers = document.querySelectorAll('.expandable-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.expand-icon');
            
            // アクティブ状態の切り替え
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                // 閉じる
                content.classList.remove('active');
                this.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
                
                // アニメーション効果
                content.style.maxHeight = '0px';
                content.style.padding = '0 20px';
                
            } else {
                // 他の開いているセクションを閉じる
                closeAllSections();
                
                // 開く
                content.classList.add('active');
                this.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
                
                // アニメーション効果
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '20px';
                
                // スムーズスクロール
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 200);
            }
            
            // クリック波紋エフェクト
            createRippleEffect(event, this);
        });
        
        // ホバーエフェクト
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });
        
        header.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });
    });
}

// 全てのセクションを閉じる
function closeAllSections() {
    const contents = document.querySelectorAll('.expandable-content');
    const headers = document.querySelectorAll('.expandable-header');
    const icons = document.querySelectorAll('.expand-icon');
    
    contents.forEach(content => {
        content.classList.remove('active');
        content.style.maxHeight = '0px';
        content.style.padding = '0 20px';
    });
    
    headers.forEach(header => {
        header.classList.remove('active');
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });
    
    icons.forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
    });
}

// インタラクティブアニメーション
function initInteractiveAnimations() {
    // ヘッダーのクリックアニメーション
    const header = document.querySelector('header h1');
    if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease-in-out';
            this.style.color = '#e74c3c';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.color = '#2c3e50';
            }, 300);
        });
    }
    
    // 機能リストのホバーアニメーション
    const featureItems = document.querySelectorAll('.feature li');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.2s ease-in-out';
            this.style.backgroundColor = '#e8f4fd';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#f8f9fa';
        });
    });
    
    // コンテナのクリック波紋エフェクト
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('click', function(e) {
            // 展開ヘッダーのクリックは除外
            if (!e.target.closest('.expandable-header')) {
                createRippleEffect(e, this);
            }
        });
    }
}

// クリック波紋エフェクト
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(52, 152, 219, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // CSS アニメーションを動的に追加
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// パーティクルエフェクト
function createParticleEffect() {
    const particles = [];
    const particleCount = 3;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 2000);
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #3498db;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.7;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: float-up 4s ease-out forwards;
    `;
    
    // パーティクルアニメーションを動的に追加
    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes float-up {
                to {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// GitHub情報を表示（実際のデプロイ時に使用）
function displayGitHubInfo() {
    const gitCommit = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION || 'local';
    const gitBranch = process.env.CODEBUILD_SOURCE_VERSION || 'main';
    
    console.log('Git Commit:', gitCommit);
    console.log('Git Branch:', gitBranch);
}

// CodeBuild環境変数の表示（デバッグ用）
function displayBuildInfo() {
    if (typeof process !== 'undefined' && process.env) {
        console.log('Build Info:', {
            buildId: process.env.CODEBUILD_BUILD_ID,
            projectName: process.env.CODEBUILD_PROJECT_NAME,
            region: process.env.AWS_DEFAULT_REGION
        });
    }
}
