class SkinManager {
    constructor() {
        this.skins = [
            { name: "Sunny Gold", color: "#f4a261", wing: "#e76f51", price: 0, unlocked: true },
            { name: "Forest Robin", color: "#2a9d8f", wing: "#264653", price: 5, unlocked: false },
            { name: "Royal Amber", color: "#e9c46a", wing: "#f4a261", price: 10, unlocked: false },
            { name: "Ruby Cardinal", color: "#e63946", wing: "#9d0208", price: 15, unlocked: false },
            { name: "Ocean Teal", color: "#48cae4", wing: "#0077b6", price: 20, unlocked: false },
            { name: "Emerald Jay", color: "#52b788", wing: "#1b4332", price: 25, unlocked: false },
            { name: "Amethyst Dove", color: "#9b5de5", wing: "#7209b7", price: 30, unlocked: false },
            { name: "Rose Finch", color: "#ff758f", wing: "#ff4d6d", price: 35, unlocked: false },
            { name: "Slate Raven", color: "#495057", wing: "#212529", price: 40, unlocked: false },
            { name: "Sunset Finch", color: "#fb8500", wing: "#d90429", price: 45, unlocked: false },
            { name: "Aqua Marine", color: "#00b4d8", wing: "#03045e", price: 50, unlocked: false },
            { name: "Crimson Hawk", color: "#b7094c", wing: "#89023e", price: 60, unlocked: false },
            { name: "Olive Warbler", color: "#606c38", wing: "#283618", price: 70, unlocked: false },
            { name: "Sky Bluebird", color: "#90e0ef", wing: "#00b4d8", price: 80, unlocked: false },
            { name: "Cosmic Nebula", color: "#560bad", wing: "#b5179e", price: 100, unlocked: false }
        ];
        this.currentIndex = 0;

        this.backgrounds = [
            { name: "Green Valley", top: "#2d6a4f", mid: "#52b788", bot: "#95d5b2", mountain: "#2d6a4f", price: 0, unlocked: true },
            { name: "Golden Sunset", top: "#1d3557", mid: "#457b9d", bot: "#f4a261", mountain: "#264653", price: 10, unlocked: false },
            { name: "Midnight Aurora", top: "#03045e", mid: "#023e8a", bot: "#0077b6", mountain: "#023e8a", price: 15, unlocked: false },
            { name: "Desert Dune", top: "#d4a373", mid: "#e9edc9", bot: "#faedcd", mountain: "#99582a", price: 20, unlocked: false },
            { name: "Cyberpunk City", top: "#240046", mid: "#3c096c", bot: "#7b2cbf", mountain: "#3c096c", price: 25, unlocked: false },
            { name: "Arctic Frost", top: "#48cae4", mid: "#ade8f4", bot: "#caf0f8", mountain: "#0096c7", price: 30, unlocked: false },
            { name: "Volcanic Ridge", top: "#370617", mid: "#6a040f", bot: "#d90429", mountain: "#6a040f", price: 35, unlocked: false },
            { name: "Lavender Hills", top: "#7209b7", mid: "#b5179e", bot: "#f72585", mountain: "#480ca8", price: 40, unlocked: false },
            { name: "Autumn Ridge", top: "#6f1d1b", mid: "#bb9457", bot: "#432818", mountain: "#5c1d1a", price: 45, unlocked: false },
            { name: "Mint Meadow", top: "#1b4332", mid: "#2d6a4f", bot: "#52b788", mountain: "#1b4332", price: 50, unlocked: false },
            { name: "Royal Amber", top: "#332211", mid: "#664422", bot: "#ddaa55", mountain: "#442211", price: 60, unlocked: false },
            { name: "Berry Twilight", top: "#590d22", mid: "#800f2f", bot: "#a4133c", mountain: "#640d14", price: 70, unlocked: false },
            { name: "Deep Ocean", top: "#012a4a", mid: "#014f86", bot: "#2a6f97", mountain: "#013a63", price: 80, unlocked: false },
            { name: "Matrix Grid", top: "#001219", mid: "#005f73", bot: "#0a9396", mountain: "#003049", price: 90, unlocked: false },
            { name: "Retro Synth", top: "#2b2d42", mid: "#8d99ae", bot: "#ef233c", mountain: "#414868", price: 100, unlocked: false }
        ];
        this.bgIndex = 0;
    }

    getCurrentSkin() { return this.skins[this.currentIndex]; }
    getCurrentBackground() { return this.backgrounds[this.bgIndex]; }

    getUnlockedSkins() {
        let unlocked = [];
        for (let i = 0; i < this.skins.length; i++) {
            if (this.skins[i].unlocked) unlocked.push(i);
        }
        return unlocked;
    }

    getUnlockedBgs() {
        let unlocked = [];
        for (let i = 0; i < this.backgrounds.length; i++) {
            if (this.backgrounds[i].unlocked) unlocked.push(i);
        }
        return unlocked;
    }
    
    loadUnlockedSkins(unlockedIndices) {
        if (!Array.isArray(unlockedIndices)) return;
        for (let i = 0; i < this.skins.length; i++) {
             this.skins[i].unlocked = unlockedIndices.includes(i);
        }
    }

    loadUnlockedBgs(unlockedIndices) {
        if (!Array.isArray(unlockedIndices)) return;
        for (let i = 0; i < this.backgrounds.length; i++) {
             this.backgrounds[i].unlocked = unlockedIndices.includes(i);
        }
    }

    selectOrBuySkin(index, currentCoins) {
        let skin = this.skins[index];
        if (skin.unlocked) {
            this.currentIndex = index;
            return { success: true, coinsSpent: 0 };
        } else if (currentCoins >= skin.price) {
            skin.unlocked = true;
            this.currentIndex = index;
            return { success: true, coinsSpent: skin.price };
        }
        return { success: false, coinsSpent: 0 };
    }

    selectOrBuyBackground(index, currentCoins) {
        let bg = this.backgrounds[index];
        if (bg.unlocked) {
            this.bgIndex = index;
            return { success: true, coinsSpent: 0 };
        } else if (currentCoins >= bg.price) {
            bg.unlocked = true;
            this.bgIndex = index;
            return { success: true, coinsSpent: bg.price };
        }
        return { success: false, coinsSpent: 0 };
    }

    drawBirdGraphic(ctx, x, y, scale, skinIndex, wingAngle = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        let skin = this.skins[skinIndex];

        ctx.fillStyle = skin.wing;
        ctx.beginPath();
        ctx.moveTo(-10, 0); ctx.lineTo(-22, -8); ctx.lineTo(-15, 2); ctx.lineTo(-24, 8); ctx.lineTo(-12, 6);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = skin.color; ctx.lineWidth = 1; ctx.stroke();

        ctx.fillStyle = skin.color;
        ctx.beginPath(); ctx.ellipse(0, 0, 16, 12, -0.1, 0, Math.PI * 2);
        ctx.fill(); ctx.strokeStyle = skin.wing; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath(); ctx.ellipse(-2, 3, 10, 7, 0, 0, Math.PI * 2); ctx.fill();

        ctx.save();
        ctx.translate(-3, 3); ctx.rotate(wingAngle);
        ctx.fillStyle = skin.wing;
        ctx.beginPath(); ctx.ellipse(0, 0, 9, 5, 0.3, 0, Math.PI * 2);
        ctx.fill(); ctx.strokeStyle = skin.color; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(7, -4, 5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#333"; ctx.lineWidth = 1; ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.beginPath(); ctx.arc(9, -4, 2, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(10, -5, 0.7, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#ff9f1c";
        ctx.beginPath(); ctx.moveTo(13, -5); ctx.lineTo(21, -1); ctx.lineTo(13, 3);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "#e85d04"; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.restore();
    }
}