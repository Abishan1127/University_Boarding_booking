import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Roombooking.css";
import CheckoutPage from "../../Checkout";

// Define interfaces for boarding and room
interface Boarding {
    board_id: number;
    board_name: string;
    board_image: string;
}

interface Room {
    board_name: ReactNode;
    room_id: number;
    board_id: number;
    room_image: string;
    room_price: number;
}

// Component
const Roombooking = () => {
    const { state } = useLocation();
    const uni_id = state?.uni_id || null;
    const uni_name = state?.uni_name || "Selected University";

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [boardingList, setBoardingList] = useState<Boarding[]>([]);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [selectedBoarding, setSelectedBoarding] = useState<Boarding | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const token = localStorage.getItem("authToken");

    // Fetch boardings related to the selected university
    useEffect(() => {
        if (!uni_id) return;
        axios.get(`http://localhost:5000/api/boarding?uni_id=${uni_id}`)
            .then(response => setBoardingList(response.data))
            .catch(error => console.error("Error fetching boarding details:", error));
    }, [uni_id]);

    // Fetch rooms when a boarding is selected
    useEffect(() => {
        if (!selectedBoarding) return;
        axios.get(`http://localhost:5000/api/room?board_id=${selectedBoarding.board_id}`)
            .then(response => setRoomList(response.data))
            .catch(error => console.error("Error fetching room details:", error));
    }, [selectedBoarding]);

    const goToNextStep = () => {
        if (currentStep === 1 && (!startDate || !endDate)) {
            setErrorMessage("Please select a valid start and end date.");
            return;
        }
        setErrorMessage(null);
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goBackToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSelectBoarding = (boarding: Boarding) => {
        setSelectedBoarding(boarding);
        setCurrentStep(3); // Move to the next step after selecting boarding
    };

    const handleSelectRoom = (room: Room) => {
        setSelectedRoom(room);
        setCurrentStep(4); // Move to confirmation step after selecting a room
    };

  
    return (
        <div className="container">
            <h2 className="title">Room Booking for {uni_name}</h2>

            <div className="progress-bar">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Select Date</div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Select Boarding</div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>Select Room</div>
                <div className={`step ${currentStep === 4 ? 'active' : ''}`}>Confirm Booking</div>
            </div>

            {currentStep === 1 && (
                <div className="dates">
                    <div className="date-picker-container">
                        <label>Start Date:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                setEndDate(null);
                                setErrorMessage(null);
                            }}
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date()}
                        />
                    </div>

                    <div className="date-picker-container">
                        <label>End Date:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                                setEndDate(date);
                                setErrorMessage(null);
                            }}
                            dateFormat="yyyy-MM-dd"
                            minDate={startDate ? new Date(startDate.getTime() + (30 * 24 * 60 * 60 * 1000) * 6) : undefined}
                            disabled={!startDate}
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {
                        !token ? <p className="please">Please Login</p> : <button className="next-button" onClick={goToNextStep}>Next</button>
                    }
                </div>
            )}

            {currentStep === 2 && (
                <div className="boarding-selection">
                    <h3>Select Boarding</h3>
                    <div className="boarding-list">
                        {boardingList.map((boarding) => (
                            <div
                                key={boarding.board_id}
                                className={`boarding-item ${selectedBoarding?.board_id === boarding.board_id ? "selected" : ""}`}
                                onClick={() => handleSelectBoarding(boarding)}
                            >
                                <img src={`http://localhost:5000${boarding.board_image}`} alt={boarding.board_name} className="boarding-image" />
                                <h4>{boarding.board_name}</h4>
                            </div>
                        ))}
                    </div>

                    <button className="next-button" onClick={goToNextStep}>Next</button>
                    <button className="back-button" onClick={goBackToPreviousStep}>Back</button>
                </div>
            )}

            {currentStep === 3 && (
                <div className="room-selection">
                    <h3>Select Room</h3>
                    <div className="room-list">
                        {roomList.map((room) => (
                            <div
                                key={room.room_id}
                                className={`room-item ${selectedRoom?.room_id === room.room_id ? "selected" : ""}`}
                                onClick={() => handleSelectRoom(room)}
                            >
                                <img src={`http://localhost:5000${room.room_image}`} alt="Room" />
                                <h3>{room.board_name}</h3>
                                <h2>Room {room.room_id}</h2>
                            </div>
                        ))}
                    </div>
                    <button className="next-button" onClick={goToNextStep}>Next</button>
                    <button className="back-button" onClick={goBackToPreviousStep}>Back</button>
                </div>
            )}

            {currentStep === 4 && (
                <div className="confirm-booking">
                    <h3>Confirm Your Booking</h3>
                    <p><strong>University:</strong> {uni_name}</p>
                    <p><strong>Boarding:</strong> {selectedBoarding?.board_name}</p>
                    <p><strong>Room:</strong> {selectedRoom?.room_id}</p>
                    <p><strong>Start Date:</strong> {startDate?.toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {endDate?.toLocaleDateString()}</p>
                    <p><strong>Price:</strong> {selectedRoom?.room_price}</p>
                    <div className="button-group">
                        <button className="back-button" onClick={goBackToPreviousStep}>Back</button>
                    </div>

                    <CheckoutPage
                        userId={1}
                        startDate={startDate instanceof Date ? startDate : undefined}
                        endDate={endDate instanceof Date ? endDate : undefined}
                        boardingId={selectedBoarding?.board_id}
                        roomId={selectedRoom?.room_id}
                        roomPrice={selectedRoom?.room_price}
                    />
                </div>
            )}
        </div>
    );

};

export default Roombooking;


