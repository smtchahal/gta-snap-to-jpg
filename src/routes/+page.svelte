<script lang="ts">
    import Dropzone from './dropzone/Dropzone.svelte';
    import ForkMe from './fork-me/ForkMe.svelte';
    import { convertSnapmaticToJpeg } from './dropzone/util';
    import JSZip from 'jszip';

    type Image = {
        src: string;
        file: File;
    };

    let downloadElement: HTMLParagraphElement;
    let images: Image[] = [];

    const handleFileDrop = async (event: CustomEvent<FileList>) => {
        const files = event.detail;
        const results = await Promise.allSettled(
            Array.from(files).map(file => convertSnapmaticToJpeg(file))
        );
        const convertedFiles = results.filter(p => p.status === 'fulfilled').map(p => p.value);
        const errors = results.filter(p => p.status === 'rejected').map(p => p.reason);
        for (const error of errors) {
            console.error(error);
        }
        if (errors.length > 0) {
            const filesWord = errors.length === 1 ? 'file was' : 'files were';
            alert(`Some files could not be converted. ${errors.length} ${filesWord} skipped.`);
        }
        images = [
            ...images,
            ...convertedFiles.map(file => ({
                src: URL.createObjectURL(file),
                file
            }))
        ];
    };

    $: if (downloadElement && images) {
        downloadElement.scrollIntoView({ behavior: 'smooth' });
    }

    let zipUrl: string | undefined;
    $: if (images.length > 1) {
        (async () => {
            const zip = new JSZip();
            for (const file of images.map(i => i.file)) {
                zip.file(file.name, file);
            }
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            zipUrl = URL.createObjectURL(zipBlob);
        })();
    } else {
        zipUrl = undefined;
    }

    const clearImages = () => {
        images = [];
    };
</script>

<ForkMe repo="https://github.com/smtchahal/gta-snap-to-jpg" />

<svelte:head />

<div class="container">
    <img src="/logos/logo192.png" alt="Logo" class="logo" />
    <h1>GTA V Snapmatic to JPEG / JPG converter</h1>
    <p>A simple tool to convert your GTA V Snapmatic snaps to JPEG / JPG files.</p>
    <p>
        <b>Note:</b> This only works locally. All conversion takes place in your browser. No files are
        uploaded.
    </p>
    <div class="dropzone-container">
        <Dropzone on:fileDrop={handleFileDrop} />
    </div>
    {#if images.length > 0}
        <p bind:this={downloadElement}>
            Click on any image to download it.
            <button class="btn" type="button" on:click={clearImages}>Clear all</button>
            {#if zipUrl}
                <a href={zipUrl} download="GTA V snaps.zip" class="btn">Download all as ZIP</a>
            {/if}
        </p>
        <ul class="images">
            {#each images as image}
                <li>
                    <a
                        href={image.src}
                        download={image.file.name}
                        title="Click to download {image.file.name}"
                    >
                        <img src={image.src} alt={image.file.name} />
                    </a>
                    <span>{image.file.name}</span>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    :global(body) {
        background: #282c34;
        color: white;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container {
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 16px;
        text-align: center;

        .logo {
            width: 92px;
        }
    }

    .dropzone-container {
        margin-top: 16px;
    }

    .images {
        padding: 0;
        margin: 16px auto 0;
        list-style: none;
        max-width: 50vw;

        @media (max-width: 767.98px) {
            max-width: 100%;
        }

        li {
            margin-top: 16px;

            img {
                width: 100%;
            }
        }
    }

    .btn {
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
        background-color: #1c1f24;
        padding: 12px 16px;
        user-select: none;
        border: none;
        border-radius: 8px;
        color: white;
    }
</style>
