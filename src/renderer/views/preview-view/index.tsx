import * as React from 'react'
import {PropTypes} from 'react'
import * as Delir from 'delir-core'

import connectToStores from '../../utils/connectToStores'

import Pane from '../components/pane'
import DropDown from '../components/dropdown'
import {ContextMenu, MenuItem} from '../electron/context-menu'

import EditorStateStore from '../../stores/editor-state-store'
import ProjectModifyStore from '../../stores/project-modify-store'

import s from './style.styl'

interface PreviewViewProps {
    activeComp: Delir.Project.Composition
}

interface PreviewViewState {
    scale: number
    scaleListShown: boolean
}

@connectToStores([EditorStateStore], () => ({
    activeComp: EditorStateStore.getState().get('activeComp')
}))
export default class PreviewView extends React.Component<PreviewViewProps, PreviewViewState>
{
    state = {
        scale: 1,
        scaleListShown: false
    }

    refs: {
        scaleList: DropDown
    }


    selectScale = (e: React.MouseEvent<HTMLLIElement>) =>
    {
        this.setState({
            scale: parseInt(e.target.dataset.value, 10) / 100,
            scaleListShown: false,
        })
    }

    toggleScaleList = (e) =>
    {
        this.refs.scaleList.toggle()
    }

    onWheel = e => {
        if (!e.altKey) return

        this.setState({
            scale: Math.max(.1, Math.min(this.state.scale + (-e.deltaY / 20), 3))
        })
    }

    render()
    {
        const {activeComp} = this.props
        const {scale, scaleListShown} = this.state
        const currentScale = Math.round(scale * 100)

        return (
            <Pane className='view-preview' allowFocus>
                <div className='inner'>
                    <div className='header'>{activeComp && activeComp.name}</div>
                    <div className='view' onWheel={this.onWheel}>
                        <canvas ref='canvas' className='canvas' width='640' height='360' style={{transform:`scale(${this.state.scale})`}}/>
                        <video ref='video' src='../../navcodec.mp4' style={{display:'none'}} controls loop />
                    </div>
                    <div className={s.footer}>
                        <label className={s.scaleLabel} onClick={this.toggleScaleList}>
                            Scale:
                            <span className={s.currentScale}>{currentScale}%</span>
                            <DropDown ref='scaleList' className={s.dropdown} shownInitial={scaleListShown}>
                                <li data-value="50" onClick={this.selectScale}>50%</li>
                                <li data-value="100" onClick={this.selectScale}>100%</li>
                                <li data-value="150" onClick={this.selectScale}>150%</li>
                                <li data-value="200" onClick={this.selectScale}>200%</li>
                                <li data-value="250" onClick={this.selectScale}>250%</li>
                                <li data-value="300" onClick={this.selectScale}>300%</li>
                            </DropDown>
                        </label>
                    </div>
                </div>
            </Pane>
        )
    }
}