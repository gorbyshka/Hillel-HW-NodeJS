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

        const uniqueResults: UrlResult[] = [];

        for (const url of this.urls) {

            try {

                const response: AxiosResponse = await axios.get(url);

                const existingResult = uniqueResults.find(result => result.data === response.data && result.error === null);

                if (!existingResult) uniqueResults.push({ data: response.data, error: null });

            } catch (errorData) {

                console.log(errorData);
                uniqueResults.push({ data: null, error: errorData });

            }

        }

        this.results = uniqueResults;

    }

    public getResults(): UrlResult[] { return this.results; }

}

export default UrlLoader;
