<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    let status = 'idle';

    const dispatch = createEventDispatcher();

    const onFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        if (files) {
            fileDrop(files);
        }
    };

    const fileDrop = (files: FileList) => {
        dispatch('fileDrop', files);
    };

    const handleFileDrop = (event: DragEvent) => {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files.length > 0) {
            fileDrop(files);
            status = 'idle';
        }
    };

    const handleFileDragOver = (event: DragEvent) => {
        event.preventDefault();
        status = 'dragging';
    };

    const handleFileDragEnter = (event: DragEvent) => {
        event.preventDefault();
        status = 'dragging';
    };

    const handleFileDragLeave = (event: DragEvent) => {
        event.preventDefault();
        status = 'idle';
    };

    onMount(() => {
        const cancel = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                status = 'idle';
            }
        };
        window.addEventListener('keydown', cancel);

        return () => {
            window.removeEventListener('keydown', cancel);
        };
    });
</script>

<input id="dropzone-input" type="file" multiple on:change={onFileChange} hidden />

<label
    class="dropzone {status}"
    for="dropzone-input"
    on:drop={handleFileDrop}
    on:dragover={handleFileDragOver}
    on:dragenter={handleFileDragEnter}
    on:dragleave={handleFileDragLeave}
>
    <slot>Click here to select files, or drag and drop.</slot>
</label>

<style lang="scss">
    .dropzone {
        cursor: pointer;
        border: 2px dashed white;
        border-radius: 8px;
        padding: 128px 64px;
        font-size: 20px;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        user-select: none;

        &:active,
        &.dragging {
            border-color: #8bff8b;
            color: #8bff8b;
        }
    }
</style>
