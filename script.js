document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const output = document.getElementById('result-output');

    if (!form || !output) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nameField = document.getElementById('userName');
        const emailField = document.getElementById('userEmail');
        const albumField = document.getElementById('userAlbum');
        const commentField = document.getElementById('userComment');
 

        output.innerHTML = "";
        [nameField, emailField, albumField, commentField].forEach(el => el.style.borderColor = "#444");

        const nameVal = nameField.value.trim();
        const emailVal = emailField.value.trim();
        const albumVal = albumField.value;
        const commentVal = commentField.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = [];


        if (nameVal === "") {
            nameField.style.borderColor = "#ff4d4d";
            errors.push("имя");
        }

        if (!emailRegex.test(emailVal)) {
            emailField.style.borderColor = "#ff4d4d";
            errors.push("email");
        }
        if (albumVal === "") {
            albumField.style.borderColor = "#ff4d4d";
            errors.push("пластинку");
        }

        if (albumVal === "Другое" && commentVal === "") {
            commentField.style.borderColor = "#ff4d4d";
            errors.push("комментарий (обязателен при выборе 'Другое')");
        }

        const messageP = document.createElement('p');
        messageP.style.marginTop = '20px';
        messageP.style.padding = '15px';
        messageP.style.borderRadius = '4px';

        if (errors.length > 0) {
            messageP.style.color = "#ff4d4d";
            messageP.style.border = "1px solid #ff4d4d";
            messageP.innerText = "Ошибка! Проверьте поля: " + errors.join(", ");
            output.appendChild(messageP);
        } else {
            messageP.style.color = "#ffffff";
            messageP.style.border = "1px solid #ffffff";

            const finalComment = commentVal || "не указан";

            messageP.innerHTML = `
                <strong>Заявка принята!</strong><br>
                Здравствуйте, ${nameVal}!<br>
                Вы выбрали: ${albumVal}.<br>
                Комментарий: ${finalComment}<br>
                Мы напишем на почту: ${emailVal}
            `;

            output.appendChild(messageP);
            form.reset();
        }
    });
});
