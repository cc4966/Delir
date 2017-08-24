import {
    Type,
    TypeDescriptor,
    EffectPluginBase,
    PreRenderingRequest,
    RenderRequest,
} from 'delir-core'

export default class Filler extends EffectPluginBase
{

    public static provideParameters(): TypeDescriptor
    {
        return Type
            .colorRgba('color', {
                label: 'Color',
            })
    }

    public async beforeRender(req: PreRenderingRequest)
    {
        // const canvas = document.createElement('canvas')
        // canvas.width = req.width
        // canvas.height = req.height
    }

    public async render(req: RenderRequest)
    {
        const param = req.parameters as any
        const canvas = req.destCanvas
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = '#8df139' // param.color.toString()
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}
