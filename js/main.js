
document.addEventListener("DOMContentLoaded", () => {
    // Инициализация VK Bridge
    vkBridge.send("VKWebAppInit");

    vkBridge.send("VKWebAppGetUserInfo").then(data => {
        console.log("Добро пожаловать,", data.first_name);
        alert(`Привет, ${data.first_name}! Семеныч уже греет лейку 🌱`);
    });

    // PIXI setup
    const app = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(app.view);

    const tips = [
        "Поливайте с умом: не лейте ведро раз в неделю — лейте по чуть-чуть, но стабильно.",
        "Не бойтесь мульчи: это одеяло для почвы.",
        "Томаты не любят сквозняки — проветривайте теплицу!",
        "Если листья скрутились — не паникуйте, анализируйте.",
        "Сеять можно и в июле — редька, укроп, шпинат успевают.",
        "Слизни? Горчица, пиво, зола — без химии!",
        "Не все советы в интернете хороши. Лучше проверенное!",
        "Детей на огород — обязательно! Урожай будет слаще.",
        "Плохая земля? Компост и сидераты — ваши друзья."
    ];

    let score = 0;
    let cropTimers = [null, null, null];
    let crops = ["", "", ""];

    function createPlot(index, x, y) {
        const plot = new PIXI.Graphics();
        plot.beginFill(0x8b5a2b);
        plot.drawRect(0, 0, 150, 150);
        plot.endFill();
        plot.x = x;
        plot.y = y;
        plot.interactive = true;
        plot.buttonMode = true;
        plot.on('pointerdown', () => handlePlotClick(index, plot));
        app.stage.addChild(plot);
    }

    function handlePlotClick(index, plot) {
        if (crops[index] !== "") return;
        const choice = prompt("Что сажаем? (редис / морковь / укроп)");
        if (!choice) return;
        let time = 5000;
        if (choice === "морковь") time = 10000;
        if (choice === "укроп") time = 15000;

        crops[index] = choice;
        plot.tint = 0x006400;

        cropTimers[index] = setTimeout(() => {
            plot.tint = 0xffff00;
            plot.interactive = true;
            plot.on('pointerdown', () => {
                alert(`Собрали ${choice}!`);
                crops[index] = "";
                score += 1;
                plot.tint = 0x8b5a2b;
                const tip = tips[Math.floor(Math.random() * tips.length)];
                alert("Совет от Семеныча: " + tip);
                console.log("score:", score);
            });
        }, time);
    }

    createPlot(0, 100, 200);
    createPlot(1, 325, 200);
    createPlot(2, 550, 200);
});
