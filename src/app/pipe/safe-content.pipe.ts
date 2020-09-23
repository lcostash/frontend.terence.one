import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeContent'
})
export class SafeContentPipe implements PipeTransform {
  /**
   * @param sanitizer DomSanitizer
   */
  constructor(protected sanitizer: DomSanitizer) {
  }

  /**
   * @param value any
   * @param type string
   * @return SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl
   */
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
