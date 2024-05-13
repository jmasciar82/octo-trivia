import React, { useEffect } from 'react';

const BotPressChat = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
                botId: '1d71b3af-613b-4899-bbc3-6c81f8beaf52',
                hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
                messagingUrl: 'https://messaging.botpress.cloud',
                clientId: '1d71b3af-613b-4899-bbc3-6c81f8beaf52',
            })
        }
    }, [])

    return <div id="webchat" />
}

export { BotPressChat }; // Exportar BotPressChat como un componente nombrado
