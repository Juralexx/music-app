import React from "react"
import { PlayerContext } from "../AppContext"

export type AudioVisualizerProps = {
    amplitude?: number
    isPlaying: boolean
}

function RealAudioVisualizer({ amplitude = 1, ...props }: AudioVisualizerProps) {
    const { player } = React.useContext(PlayerContext)

    const canvas = React.useRef() as React.RefObject<HTMLCanvasElement>
    const [audioContext, setAudioContext] = React.useState<AudioContext>()
    const [source, setSource] = React.useState<MediaElementAudioSourceNode>()

    React.useEffect(() => {
        if (props.isPlaying) {
            if (audioContext === undefined && source === undefined) {
                const context = new (window.AudioContext || (window as any).webkitAudioContext)()
                setAudioContext(context)
                setSource(context.createMediaElementSource(player!))
            }
        }
    }, [audioContext, source, props.isPlaying])

    function render(analyser: any, context: any, animationFrame: any) {
        const frequencyBinCountArray = new Uint8Array(analyser.frequencyBinCount)
        const barCount = canvas.current!.width

        analyser.getByteFrequencyData(frequencyBinCountArray)

        context!.clearRect(0, 0, canvas.current!.width, canvas.current!.height)
    
        const color = getComputedStyle(canvas.current!).getPropertyValue("--primary")
        context!.fillStyle = color

        for (let i = 0; i < barCount; i++) {
            const barPosition = i
            const barWidth = 2
            // Negative so it goes to the top.
            const barHeight = -(frequencyBinCountArray[i] / 2) * amplitude

            context!.fillRect(
                barPosition,
                canvas.current!.height,
                barWidth,
                barHeight
            )
        }

        animationFrame = requestAnimationFrame(() => render(analyser, context, animationFrame))
    }

    React.useEffect(() => {
        if (props.isPlaying) {
            if (audioContext !== undefined && source !== undefined) {
                if (!canvas.current) return
                if (!player) return

                audioContext.resume()

                let animationFrame = Number()

                const analyser = audioContext.createAnalyser()
                const context = canvas.current.getContext("2d")

                source.connect(analyser)
                analyser.connect(audioContext.destination)

                render(analyser, context, animationFrame)

                return () => {
                    cancelAnimationFrame(animationFrame)
                    analyser.disconnect()
                    source.disconnect()
                }
            }
        }
    }, [props.isPlaying, audioContext, source])

    return (
        <canvas className="__visualizer" ref={canvas} />
    )
}

// This is an wrapper to RealAudioVisualizer.
export default function AudioVisualizer(props: AudioVisualizerProps) {
    if (window.AudioContext || (window as any).webkitAudioContext) {
        return <RealAudioVisualizer {...props} />
    } else {
        return <></>
    }
}