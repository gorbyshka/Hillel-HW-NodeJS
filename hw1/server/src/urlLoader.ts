import axios, { AxiosResponse } from 'axios';
import { UrlResult } from './types/UrlResultType';

class UrlLoader {

    private urls: string[];
    private results: UrlResult[];

    constructor(urls: string[]) {

        this.urls = urls;
        this.results = [];

    }

    public async loadingOneByOne(): Promise<void> {

        for (const url of this.urls) {

            try {

                const response: AxiosResponse = await axios.get(url);

                this.results.push({ data: response.data, error: null });

            } catch (errorData) {

                console.log(errorData);

                this.results.push({ data: null, error: errorData });

            }

        }

    }

    public getResults(): UrlResult[] { return this.results; }

}

export default UrlLoader;
