import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Column } from '@/components/lib/column/Column';
import { InputSwitch } from '@/components/lib/inputswitch/InputSwitch';
import { TreeTable } from '@/components/lib/treetable/TreeTable';
import { useEffect, useState } from 'react';
import { NodeService } from '../../../../service/NodeService';

export function SingleRowSelectionDoc(props) {
    const [nodes, setNodes] = useState([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [metaKey, setMetaKey] = useState(true);

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const code = {
        basic: `
<InputSwitch checked={metaKey} onChange={(e) => setMetaKey(e.value)} />

<TreeTable value={nodes} selectionMode="single" selectionKeys={selectedNodeKey}
        onSelectionChange={(e) => setSelectedNodeKey(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
    <Column field="name" header="Name" expander></Column>
    <Column field="size" header="Size"></Column>
    <Column field="type" header="Type"></Column>
</TreeTable>
        `,
        javascript: `
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { NodeService } from './service/NodeService';

export default function SingleRowSelectionDemo() {
    const [nodes, setNodes] = useState([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [metaKey, setMetaKey] = useState(true);

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e) => setMetaKey(e.value)} />
                <label htmlFor="input-metakey">MetaKey</label>
            </div>
            <TreeTable value={nodes} selectionMode="single" selectionKeys={selectedNodeKey} onSelectionChange={(e) => setSelectedNodeKey(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useEffect } from 'react';
import { TreeTable, TreeTableSelectionEvent } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { NodeService } from './service/NodeService';

export default function SingleRowSelectionDemo() {
    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e: InputSwitchChangeEvent) => setMetaKey(e.value)} />
                <label htmlFor="input-metakey">MetaKey</label>
            </div>
            <TreeTable value={nodes} selectionMode="single" selectionKeys={selectedNodeKey} onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNodeKey(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>
        </div>
    )
}
        `,
        data: `
{
    key: '0',
    data: {
        name: 'Applications',
        size: '100kb',
        type: 'Folder'
    },
    children: [
        {
            key: '0-0',
            data: {
                name: 'React',
                size: '25kb',
                type: 'Folder'
            },
            children: [
                {
                    key: '0-0-0',
                    data: {
                        name: 'react.app',
                        size: '10kb',
                        type: 'Application'
                    }
                },
                {
                    key: '0-0-1',
                    data: {
                        name: 'native.app',
                        size: '10kb',
                        type: 'Application'
                    }
                },
                {
                    key: '0-0-2',
                    data: {
                        name: 'mobile.app',
                        size: '5kb',
                        type: 'Application'
                    }
                }
            ]
        },
        {
            key: '0-1',
            data: {
                name: 'editor.app',
                size: '25kb',
                type: 'Application'
            }
        },
        {
            key: '0-2',
            data: {
                name: 'settings.app',
                size: '50kb',
                type: 'Application'
            }
        }
    ]
},
...
`
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Single node selection is configured by setting <i>selectionMode</i> as <i>single</i> along with <i>selectionKeys</i> and <i>onSelectionChange</i> properties to manage the selection value binding.
                </p>
                <p>
                    By default, metaKey press (e.g. <i>⌘</i>) is necessary to unselect a node however this can be configured with disabling the <i>metaKeySelection</i> property. In touch enabled devices this option has no effect and behavior is same
                    as setting it to false.
                </p>
            </DocSectionText>
            <div className="card">
                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                    <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e) => setMetaKey(e.value)} />
                    <label htmlFor="input-metakey">MetaKey</label>
                </div>
                <TreeTable value={nodes} selectionMode="single" selectionKeys={selectedNodeKey} onSelectionChange={(e) => setSelectedNodeKey(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" expander />
                    <Column field="size" header="Size" />
                    <Column field="type" header="Type" />
                </TreeTable>
            </div>
            <DocSectionCode code={code} service={['NodeService']} />
        </>
    );
}
