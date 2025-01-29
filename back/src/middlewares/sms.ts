import fetch from 'node-fetch';

class Request {
    __apiBase: any;
    __apiVersion: any;
    __apiKey: string | string[] | undefined;
    constructor() { }

    async request(reqpath: string, data: { [x: string]: string | number | boolean; receptor?: any; type?: any; template?: any; ip?: any; param1?: any; param2?: any; param3?: any; }) {
        let reqfullpath = this.__apiBase + this.__apiVersion + reqpath;

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&") as any

        let response = await fetch(reqfullpath, {
            method: 'POST',
            body: formBody,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                charset: "utf-8",
                apikey: this.__apiKey
            } as any
        });

        let json = await response.json();
        return json;
    }
}

class Ghasedak extends Request {
    [x: string]: any;
    constructor(apiKey: string, apiVersion = "/v2", apiBase = "https://api.ghasedak.me") {
        super();
        this.__apiKey = apiKey;
        this.__apiVersion = apiVersion;
        this.__apiBase = apiBase;
    }

    async verification(opts: { receptor: any; type: any; template: any; param1: any; hasOwnProperty?: any; ip?: any; param2?: any; param3?: any; }) {
        if (!opts.hasOwnProperty("receptor")) {
            console.log("receptor is required.");
            return;
        } else {
            this.__receptor = opts.receptor;
        }

        if (!opts.hasOwnProperty("type")) {
            console.log("type is required.");
            return;
        } else {
            this.__type = opts.type;
        }

        if (!opts.hasOwnProperty("template")) {
            console.log("template is required.");
            return;
        } else {
            this.__template = opts.template;
        }

        let promise = await this.request("/sms/send/verification?agent=node", {
            "receptor": this.__receptor,
            "type": this.__type,
            "template": this.__template,
            "ip": opts.ip,
            "param1": opts.param1,
            "param2": opts.param2,
            "param3": opts.param3
        });
        return promise;
    }
}

export default Ghasedak;