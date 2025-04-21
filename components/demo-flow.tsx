'use client'

import { ReactFlow, type Node, type Edge, Position } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CustomCardNode from './custom-card-node'
import { MessageSquare, Palette, Film, InstagramIcon, YoutubeIcon } from 'lucide-react'

const nodeTypes = {
  customCard: CustomCardNode,
}

type CustomNode = Node<{
  label: string
  icon?: React.ComponentType
  logoPath?: string
  description?: string
  className?: string
}>

const nodes: CustomNode[] = [
  {
    id: '1',
    type: 'customCard',
    data: {
      label: 'Media Library',
      icon: Film,
      description: 'Upload any existing videos',
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'customCard',
    data: {
      label: 'Generation Prompt',
      icon: MessageSquare,
      description: 'Describe what you want to create',
    },
    position: { x: 0, y: 100 },
    sourcePosition: Position.Right,
  },
  {
    id: '3',
    type: 'customCard',
    data: {
      label: 'Brand Guidelines',
      icon: Palette,
      description: 'Your brand style and guidelines',
    },
    position: { x: 0, y: 200 },
    sourcePosition: Position.Right,
  },
  {
    id: '4',
    type: 'customCard',
    data: {
      label: 'DemoDrive',
      logoPath: '/logo.svg',
      description: 'AI creator for your product',
      className: 'glow bg-accent text-foreground',
    },
    position: { x: 350, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    className: 'relative before:absolute before:inset-0 before:-z-10 before:rounded-sm before:bg-accent before:blur-[10px] before:opacity-10 before:animate-pulse before:content-[""]',
  },
  {
    id: '5',
    type: 'customCard',
    data: {
      label: 'Shorts Clips',
      icon: InstagramIcon,
      description: 'Short Marketing Videos',
    },
    position: { x: 700, y: 200 },
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'customCard',
    data: {
      label: 'Youtube Video',
      icon: YoutubeIcon,
      description: 'HD Landscape Videos',
    },
    position: { x: 700, y: 0 },
    targetPosition: Position.Left,
  },
]

const edges: Edge[] = [
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    style: { stroke: '#fff', strokeWidth: 2 },
    animated: true,
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    style: { stroke: '#fff', strokeWidth: 2 },
    animated: true,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    style: { stroke: '#fff', strokeWidth: 2 },
    animated: true,
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style: { stroke: '#fff', strokeWidth: 2 },
    animated: true,
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    style: { stroke: '#fff', strokeWidth: 2 },
    animated: true,
  },
]

const defaultViewport = { x: 0, y: 0, zoom: 1 }

export default function DemoFlow() {
  return (
    <div style={{ width: '100%', height: '400px', background: '#000' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
        preventScrolling={true}
        fitView
      >
      </ReactFlow>
    </div>
  )
}
