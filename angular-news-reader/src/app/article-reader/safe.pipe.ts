// Import necessary modules
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Define the pipe
@Pipe({
        name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    // Transform the URL to a safe resource URL
    transform(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}