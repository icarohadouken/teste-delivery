import crypto from 'crypto'

const key = crypto.createHash("sha256").update("makakitoloko", "ascii").digest();

const IV_LENGTH = 16

export class HashManager{
    public cipher(text: string): string{
        const iv = crypto.randomBytes(IV_LENGTH); 
        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

        let encrypted = cipher.update(text)

        encrypted = Buffer.concat([encrypted, cipher.final()])

        console.log(encrypted.toString('hex'))

        return iv.toString('hex') + ":" + encrypted.toString('hex')
    }

    public decipher(encrypted: string): string{
        let textParts = encrypted.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }

    public async check(text: string, hash: string){
        const senhaESalt = sha512(text, "makakitoloko")
        return hash === senhaESalt.hash.toString()
    }
    
}

function sha512(senha, salt){
    const hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
    hash.update(senha);
    hash.digest('hex');
    return {
        salt,
        hash,
    };
};

