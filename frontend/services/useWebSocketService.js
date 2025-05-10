import { useRef, useEffect, useState } from "react";

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL
// "ws://localhost:4000";

const useWebSocketService = (roomId, username) => {

    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const reconnectAttempts = useRef(0);
    const reconnectTimeout = useRef(null);
    const MAX_RECONNECT_ATTEMPTS = 3;
    const RECONNECT_INTERVAL = 5000;
    const isConnecting = useRef(false);

    const clearReconnectTimeout = () => {
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }
    };
    
    const connectWebSocket = () => {
        // Nếu đang trong quá trình kết nối, không tạo kết nối mới
        if (isConnecting.current) {
            console.log("🔄 Đang trong quá trình kết nối, bỏ qua yêu cầu kết nối mới");
            return;
        }

        try {
            isConnecting.current = true;

            // Đóng kết nối cũ nếu có
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                console.log("🔄 Đóng kết nối cũ trước khi tạo kết nối mới");
                socketRef.current.close();
            }

            console.log("🔌 Đang kết nối đến WebSocket server...");
            socketRef.current = new WebSocket(WEBSOCKET_URL);
            setSocket(socketRef.current);

            socketRef.current.onopen = () => {
                console.log("✅ Đã kết nối WebSocket");
                setIsConnected(true);
                setError(null);
                reconnectAttempts.current = 0;
                isConnecting.current = false;

                // Gửi yêu cầu tham gia phòng
                setTimeout(() => {
                    sendMessage({
                        type: "join-room",
                        username,
                        meetingCode:roomId
                    });
                }
                , 1000);

            };


            socketRef.current.onclose = (event) => {
                console.log("❌ WebSocket đã ngắt kết nối", event.code, event.reason);
                setIsConnected(false);
                isConnecting.current = false;

                // Chỉ thử kết nối lại nếu không phải do người dùng chủ động đóng
                if (event.code !== 1000 && event.code !== 1001) {
                    if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
                        const attempt = reconnectAttempts.current + 1;
                        setError(`Mất kết nối. Đang thử kết nối lại (${attempt}/${MAX_RECONNECT_ATTEMPTS})...`);
                        clearReconnectTimeout();
                        reconnectTimeout.current = setTimeout(() => {
                            reconnectAttempts.current = attempt;
                            connectWebSocket();
                        }, RECONNECT_INTERVAL);
                    } else {
                        setError("Không thể kết nối đến server. Vui lòng tải lại trang.");
                    }
                }
            };

            socketRef.current.onerror = (error) => {
                console.error("❌ Lỗi WebSocket:", error);
                setError("Lỗi kết nối WebSocket");
                isConnecting.current = false;
            };

        } catch (error) {
            console.error("❌ Lỗi khởi tạo WebSocket:", error);
            setError("Không thể kết nối đến server");
            setIsConnected(false);
            isConnecting.current = false;
        }
    };


    useEffect(() => {
        if (!roomId || !username) {
            setError("Room ID và username là bắt buộc");
            return;
        }

        connectWebSocket();

        return () => {
            clearReconnectTimeout();
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                console.log("🔌 Đóng WebSocket do component unmount");
                socketRef.current.close(1000, "Component unmounted");
            }
            isConnecting.current = false;
        };
    }, [roomId, username]);

    const sendMessage = (data) => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.log("⚠️ WebSocket chưa sẵn sàng, không thể gửi tin nhắn");
            return;
        }

        try {
            socketRef.current.send(JSON.stringify(data));
        } catch (error) {
            console.error("❌ Lỗi gửi tin nhắn:", error);
            setError("Không thể gửi tin nhắn");
        }
    };

    return {
        socket,
        isConnected,
        error,
        sendMessage
    };
};

export default useWebSocketService;
