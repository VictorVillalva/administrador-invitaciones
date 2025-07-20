'use client'
import bgImage from "@/assets/images/DanielaMedelXV/bg-blue-flowers.jpg"
import { useEffect, useState } from "react";

export default function CardFestejada() {
    const targetDate = new Date('2025-09-06T17:00:00'); // Fecha del evento
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(intervalId);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div className={`w-full h-full bg-[#4F619B] relative px-4 py-6 text-white flex flex-col gap-16 rounded-[4px]`}>
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10 rounded-[4px] pointer-events-none"
                style={{ backgroundImage: `url(${bgImage.src})` }}
            />
            {/* <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${bgImage.src})` }}></div> */}
            <div className="flex flex-col justify-center items-center gap-8 h-full">
                <div className="flex flex-col text-center">
                    <p className="text-4xl font-bold">Daniela Medel Muñiz</p>
                </div>
                <div className="numero-personas flex flex-col text-center">
                    <p className="font-medium">Nombre del evento</p>
                    <p className="font-semibold text-2xl">XV Años de Daniela Medel</p>
                </div>
                <div className="numero-personas flex flex-col text-center">
                    <p className="font-medium">Fecha del evento</p>
                    <p className="font-semibold text-2xl">06 de Septiembre del 2025</p>
                </div>
                <div className="countdown">
                    <div className="flex items-center justify-center w-full gap-1.5 count-down-main">
                        <div className="timer">
                            <div className="rounded-xl bg-gradient-to-b from-[#c09a1e] to-[#CBA836] py-3 w-[60px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                <h3 className="countdown-element days font-manrope font-semibold text-base text-white text-center">
                                    {String(timeLeft.days).padStart(2, '0')}
                                </h3>
                                <p className="text-[8px] font-manrope font-normal text-white mt-1 text-center w-full">Dias</p>
                            </div>
                        </div>
                        <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
                        <div className="timer">
                            <div className="rounded-xl bg-gradient-to-b from-[#c09a1e] to-[#CBA836] py-3 w-[60px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                <h3 className="countdown-element hours font-manrope font-semibold text-base text-white text-center">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </h3>
                                <p className="text-[8px] font-manrope font-normal text-white mt-1 text-center w-full">Horas</p>
                            </div>
                        </div>
                        <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
                        <div className="timer">
                            <div className="rounded-xl bg-gradient-to-b from-[#c09a1e] to-[#CBA836] py-3 w-[60px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                <h3 className="countdown-element minutes font-manrope font-semibold text-base text-white text-center">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </h3>
                                <p className="text-[8px]  font-manrope font-normal text-white mt-1 text-center w-full">Minutos</p>
                            </div>
                        </div>
                        <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
                        <div className="timer">
                            <div className="rounded-xl bg-gradient-to-b from-[#c09a1e] to-[#CBA836] py-3 w-[60px] flex items-center justify-center flex-col gap-1 aspect-square px-3">
                                <h3 className="countdown-element seconds font-manrope font-semibold text-base text-white text-center">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </h3>
                                <p className="text-[8px] font-manrope font-normal text-white mt-1 text-center w-full">Segundos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Image src={flowerLeft} alt="Flor" width={144} className="absolute bottom-0 left-0 w-[114px]" />
            <Image src={flowerRight} alt="Flor" className="absolute bottom-0 right-0 w-[114px] transform scale-x-[-1]" /> */}
        </div>
    )
}