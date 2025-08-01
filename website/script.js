// CodePipeline S3 Demo JavaScript - v2.3.0 Animation Update

document.addEventListener('DOMContentLoaded', function() {
    // 現在の日時を表示
    updateTimestamp();
    
    // 5秒ごとにタイムスタンプを更新
    setInterval(updateTimestamp, 5000);
    
    // デプロイ成功のアニメーション
    animateDeployStatus();
    
    // 新機能: インタラクティブアニメーション
    initInteractiveAnimations();
    
    // 新機能: パーティクルエフェクト
    createParticleEffect();
    
    // OAuth修正テスト情報をログ出力
    console.log('🎉 Animation Features Added - v2.3.0 - ' + new Date().toISOString());
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

// 新機能: インタラクティブアニメーション
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
            createRippleEffect(e, this);
        });
    }
}

// 新機能: クリック波紋エフェクト
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

// 新機能: パーティクルエフェクト
function createParticleEffect() {
    const particles = [];
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 1000);
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
        animation: float-up 3s ease-out forwards;
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
    }, 3000);
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
