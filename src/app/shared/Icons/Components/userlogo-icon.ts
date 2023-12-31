import { Component, OnInit } from "@angular/core";

@Component({
  selector: "userlogo-icon",
  template: `
  <svg class='userlogo-icon' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"  x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" >
  <g>
    <g xmlns="http://www.w3.org/2000/svg" id="User">
      <circle cx="32" cy="32" fill="#e6ecff" r="31" data-original="#e6ecff" class=""></circle>
      <g fill="#4294ff">
        <path d="m56.877 50.4748a31.0647 31.0647 0 0 0 -49.7651-.0156 30.9669 30.9669 0 0 0 49.7651.0156z" fill="#4294ff" data-original="#4294ff" class=""></path>
        <circle cx="32" cy="22" r="12" fill="#4294ff" data-original="#4294ff" class=""></circle>
      </g>
    </g>
    <script></script>
  </g>
</svg>


`,
styleUrls: ['../icons.css']
})
export class UserlogoIconComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
