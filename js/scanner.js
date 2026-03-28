let scannerInstance = null;

export function iniciarScanner(divId, onScanSuccess) {
    if (!scannerInstance) {
        scannerInstance = new Html5Qrcode(divId);
    }

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const rearCamera = devices.find(cam => cam.label.toLowerCase().includes("back")) || devices[devices.length - 1];
            
            scannerInstance.start(
                rearCamera.id,
                config,
                (decodedText) => {
                    // Pausa levemente para não bipar 2x o mesmo
                    if(scannerInstance.isScanning){
                        scannerInstance.pause();
                        onScanSuccess(decodedText.trim());
                        setTimeout(() => { if(scannerInstance.isScanning) scannerInstance.resume(); }, 1500);
                    }
                }
            ).catch(err => console.error("Erro ao iniciar câmera:", err));
        }
    }).catch(err => console.error("Sem permissão de câmera", err));
}

export function pararScanner() {
    if (scannerInstance && scannerInstance.isScanning) {
        scannerInstance.stop().then(() => {
            scannerInstance.clear();
        }).catch(err => console.error("Erro ao parar câmera:", err));
    }
}