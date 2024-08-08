
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab, faFacebook, faFacebookF, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { from } from 'rxjs/internal/observable/from';


@Component({

  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
faInstagram = faInstagram;

fab = fab;
constructor(library: FaIconLibrary) {
  library.addIconPacks(fab);
}

}
