import { Component, h, Host } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { FileSystemService } from '../../../../services/file-system-services';

@Component({
  tag: 'admin-upload',
  styleUrl: 'admin-upload.css',
})
export class AdminUpload {
  dropdownFunction() {
    document.getElementById('updrop1').style.height = '80px';
  }
  render = () => (
    <Host class="Upload">
      <div class="Upload-Side">
        <div class="Button">Upload Media</div>
        <div class="Upload-Collections">
          COLLECTIONS
          <button class="Upload-Dots">
            <img src="\assets\icon\3Dots-icon.svg" />
            <div id="addDropdown" class="Upload-Dots-Content">
              <button>Add Collection</button>
            </div>
          </button>
        </div>
        <button class="Upload-Collection">
          Images
          <div class="Upload-EditDots">
            <img src="\assets\icon\3Dots-icon.svg" />
          </div>
        </button>
        <button class="Upload-Collection">
          Cats
          <div class="Upload-EditDots">
            <img src="\assets\icon\3Dots-icon.svg" />
          </div>
        </button>
      </div>
      <button
        onClick={() => {
          FileSystemService.getChild();
        }}
      ></button>
      <button
        onClick={() => {
          FileSystemService.makeDir();
        }}
      ></button>

      <div class="Upload-Content">
        <input class="Upload-Searchbar" type="text" placeholder="Search" />
        <div class="Upload-Categories"> COLLECTIONS &#62;&nbsp;</div>
        <div class="Upload-File-Box">
          <div class="Upload-Images">
            <div class="Upload-Outer-Image">
              <div class="Upload-Inner-Image" onClick={() => this.dropdownFunction()}>
                <div id="updrop1" class="Upload-Dropdown">
                  Gonna <br> </br>need <br> </br> this <br></br>later
                </div>
              </div>
            </div>
            <div class="Upload-Outer-Image">
              <div class="Upload-Inner-Image" onClick={() => this.dropdownFunction()}>
                <div id="updrop2" class="Upload-Dropdown">
                  Gonna <br> </br>need <br> </br> this <br></br>later
                </div>
              </div>
            </div>
            <div class="Upload-Outer-Image">
              <div class="Upload-Inner-Image" onClick={() => this.dropdownFunction()}>
                <div id="updrop3" class="Upload-Dropdown">
                  Gonna <br> </br>need <br> </br> this <br></br>later
                </div>
              </div>
            </div>
          </div>
          <ul class="Upload-Image-Text">
            <li> Image.png </li>
            <li> Image.png </li>
            <li> Image.png </li>
          </ul>
        </div>
        <div class="Upload-Button-Box">
          <button class="Upload-Button-1">Cancel</button>
          <button class="Upload-Button-2 Button"> Select Media</button>
        </div>
      </div>
    </Host>
  );
}
