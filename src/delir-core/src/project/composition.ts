import * as _ from 'lodash'
import ColorRGB from '../values/color-rgb'
import Project from './project'
import Timelane from './timelane'

import {CompositionScheme} from './scheme/composition'

export default class Composition
{
    static deserialize(compJson: CompositionScheme, project: Project)
    {
        const comp = new Composition
        const config: CompositionScheme = _.pick(compJson.config, [
            'name',
            'width',
            'height',
            'framerate',
            'durationFrames',
            'samplingRate',
            'audioChannels',
            'backgroundColor',
        ]) as CompositionScheme

        const timelanes = compJson.timelanes.map(lane => Timelane.deserialize(lane))

        Object.defineProperty(comp, 'id', {value: compJson.id})
        comp.timelanes = timelanes
        Object.assign(comp.config, config)

        const color = config.backgroundColor
        comp.backgroundColor = new ColorRGB(color.red, color.green, color.blue)
        return comp
    }

    id: string|null = null

    timelanes : Timelane[] = []

    config : {
        name: string|null,
        width: number|null,
        height: number|null,
        framerate: number|null,
        durationFrames: number|null,

        samplingRate: number|null,
        audioChannels: number|null,

        backgroundColor: ColorRGB|null,
    } = {
        name: null,
        width: null,
        height: null,
        framerate: null,
        durationFrames: null,

        samplingRate: null,
        audioChannels: null,

        backgroundColor: new ColorRGB(0, 0, 0),
    }

    get name(): string { return this.config.name as string }
    set name(name: string) { this.config.name = name }

    get width(): number { return this.config.width as number }
    set width(width: number) { this.config.width = width }

    get height(): number { return this.config.height as number }
    set height(height: number) { this.config.height = height }

    get framerate(): number { return this.config.framerate as number }
    set framerate(framerate: number) { this.config.framerate = framerate }

    /** @deprecated */
    get durationFrame(): number { throw new Error('composition.durationFrame is discontinuance.') }
    /** @deprecated */
    set durationFrame(durationFrames: number) { throw new Error('composition.durationFrame is discontinuance.') }

    get durationFrames(): number { return this.config.durationFrames as number }
    set durationFrames(durationFrames: number) { this.config.durationFrames = durationFrames }

    get samplingRate(): number { return this.config.samplingRate as number }
    set samplingRate(samplingRate: number) { this.config.samplingRate = samplingRate }

    get audioChannels(): number { return this.config.audioChannels as number }
    set audioChannels(audioChannels: number) { this.config.audioChannels = audioChannels }

    get backgroundColor(): ColorRGB { return this.config.backgroundColor as ColorRGB }
    set backgroundColor(backgroundColor: ColorRGB) { this.config.backgroundColor = backgroundColor }

    constructor()
    {
        Object.seal(this)
    }

    toPreBSON(): Object
    {
        return {
            id: this.id,
            config: Object.assign({}, this.config),
            timelanes: this.timelanes.map(timelane => timelane.toPreBSON()),
        }
    }

    toJSON(): Object
    {
        return {
            id: this.id,
            config: Object.assign({}, this.config),
            timelanes: this.timelanes.map(timelane => timelane.toJSON()),
        }
    }
}
