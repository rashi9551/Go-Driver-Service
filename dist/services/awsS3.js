"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
function uploadToS3(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = Date.now().toString();
        const cloudfrontURL = process.env.cloudfrontURL;
        const s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_S3_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        try {
            yield s3Client.send(command);
            console.log("Uploaded file to S3 successfully.");
            return cloudfrontURL + filename;
        }
        catch (error) {
            console.error("Error uploading file to S3:", error);
            return error.message;
        }
    });
}
exports.default = uploadToS3;
