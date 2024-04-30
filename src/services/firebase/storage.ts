import {SF as storage} from './config';

class Storage {
    constructor() {

    }

    async delete(path:string) {
        await storage.ref(path).delete()
    }

    async putFile(file:any, key:string) {
        const fr = new FileReader();
        fr.readAsArrayBuffer(file);
        return await new Promise((resolve, reject) => {
            fr.onload = async function () {
                // @ts-ignore
                const blob = new Blob([fr.result]);
                const uploadTask = storage.ref(`${key}`).put(blob);
                uploadTask.on('state_changed', (taskSnapshot) => {
                });
                try {
                    await uploadTask;
                    const image_url = await uploadTask.snapshot.ref.getDownloadURL();
                    resolve(image_url);
                } catch (e) {
                    resolve(false);
                }
            }
        })

    }
}
export default new Storage();
