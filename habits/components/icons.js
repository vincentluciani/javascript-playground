/*var taskIcon = '<svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" fill="#000" stroke="#000" stroke-width="2" d="M12,20 L24,20 M12,12 L24,12 M12,4 L24,4 M1,19 L4,22 L9,17 M1,11 L4,14 L9,9 M9,1 L4,6 L1,3"/></svg>'
*/

var taskIcon='<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16"><path fill="#000000" d="M2,11 L4,11 C4.51283143,11 4.93550653,11.386027 4.9932722,11.8833761 L5,12 L5,14 C5,14.51285 4.61395571,14.9355092 4.11662025,14.9932725 L4,15 L2,15 C1.48716857,15 1.06449347,14.613973 1.0067278,14.1166239 L1,14 L1,12 C1,11.48715 1.38604429,11.0644908 1.88337975,11.0067275 L2,11 L4,11 L2,11 Z M14,12 C14.5523,12 15,12.4477 15,13 C15,13.5523 14.5523,14 14,14 L8,14 C7.44772,14 7,13.5523 7,13 C7,12.4477 7.44772,12 8,12 L14,12 Z M4,12 L2,12 L2,14 L4,14 L4,12 Z M4,6 C4.55228,6 5,6.44772 5,7 L5,9 C5,9.55228 4.55228,10 4,10 L2,10 C1.44772,10 1,9.55228 1,9 L1,7 C1,6.44772 1.44772,6 2,6 L4,6 Z M14,7 C14.5523,7 15,7.44772 15,8 C15,8.51283143 14.613973,8.93550653 14.1166239,8.9932722 L14,9 L8,9 C7.44772,9 7,8.55228 7,8 C7,7.48716857 7.38604429,7.06449347 7.88337975,7.0067278 L8,7 L14,7 Z M4,7 L2,7 L2,9 L4,9 L4,7 Z M4.77466,1.22614 C5.04092364,1.49240364 5.06512942,1.90907223 4.84727736,2.20268222 L4.77466,2.2868 L2.28033,4.78113 C2.13968,4.92179 1.94891,5.0008 1.75,5.0008 C1.590872,5.0008 1.4369536,4.9502336 1.30973856,4.85798912 L1.21967,4.78113 L0.21967,3.78113 C-0.0732233,3.48824 -0.0732233,3.01337 0.21967,2.72047 C0.485936364,2.45420636 0.902600248,2.43000058 1.19621162,2.64785264 L1.28033,2.72047 L1.75,3.19014 L3.714,1.22614 C4.00689,0.933247 4.48176,0.933246 4.77466,1.22614 Z M14,2 C14.5523,2 15,2.44772 15,3 C15,3.51283143 14.613973,3.93550653 14.1166239,3.9932722 L14,4 L8,4 C7.44772,4 7,3.55228 7,3 C7,2.48716857 7.38604429,2.06449347 7.88337975,2.0067278 L8,2 L14,2 Z"/></svg>'
var writeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" class="jam jam-write"><path stroke="#ffffff" fill="#ffffff" d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/></svg>'
var writeIconSmall = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#000" stroke="#000" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" class="jam jam-write"><path stroke="#000" fill="#000" d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/></svg>'

var graphIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 305.004 305.004" style="enable-background:new 0 0 305.004 305.004;" xml:space="preserve"><g><path fill="#ffffff"  stroke="#ffffff" d="M68.788,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-60.149c0-5.247-4.253-9.5-9.5-9.5H68.788c-5.247,0-9.5,4.253-9.5,9.5   v60.149C59.288,177.615,63.541,181.868,68.788,181.868z"/><path stroke="#ffffff" fill="#ffffff" d="M138.71,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5V84.174c0-5.247-4.253-9.5-9.5-9.5H138.71c-5.247,0-9.5,4.253-9.5,9.5   v88.195C129.21,177.615,133.463,181.868,138.71,181.868z"/><path stroke="#ffffff" fill="#ffffff" d="M208.632,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-19.195c0-5.247-4.253-9.5-9.5-9.5h-27.583c-5.247,0-9.5,4.253-9.5,9.5   v19.195C199.132,177.615,203.385,181.868,208.632,181.868z"/><path stroke="#ffffff" fill="#ffffff"  d="M290.668,22.769H167.502V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v7.769H14.335c-5.247,0-9.5,4.253-9.5,9.5v195   c0,5.247,4.253,9.5,9.5,9.5h123.167v20.719L97.15,276.42c-7.5,3.52-10.728,12.451-7.209,19.951   c3.518,7.5,12.451,10.727,19.951,7.209l28.25-13.254c1.858,6.174,7.581,10.674,14.36,10.674c6.779,0,12.502-4.5,14.36-10.673   l28.25,13.254c7.507,3.52,16.435,0.285,19.951-7.209c3.519-7.5,0.291-16.432-7.209-19.951l-40.352-18.932v-20.719h123.167   c5.247,0,9.5-4.253,9.5-9.5v-195C300.168,27.022,295.915,22.769,290.668,22.769z M270.168,206.769H34.835v-154h235.333V206.769z"/></svg>'

var graphIconSmall = '<svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" fill="#000" stroke="#000"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 305.004 305.004" style="enable-background:new 0 0 305.004 305.004;" xml:space="preserve"><g><path fill="#000"  stroke="#000" d="M68.788,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-60.149c0-5.247-4.253-9.5-9.5-9.5H68.788c-5.247,0-9.5,4.253-9.5,9.5   v60.149C59.288,177.615,63.541,181.868,68.788,181.868z"/><path stroke="#000" fill="#000" d="M138.71,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5V84.174c0-5.247-4.253-9.5-9.5-9.5H138.71c-5.247,0-9.5,4.253-9.5,9.5   v88.195C129.21,177.615,133.463,181.868,138.71,181.868z"/><path stroke="#000" fill="#000" d="M208.632,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-19.195c0-5.247-4.253-9.5-9.5-9.5h-27.583c-5.247,0-9.5,4.253-9.5,9.5   v19.195C199.132,177.615,203.385,181.868,208.632,181.868z"/><path stroke="#000" fill="#000"  d="M290.668,22.769H167.502V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v7.769H14.335c-5.247,0-9.5,4.253-9.5,9.5v195   c0,5.247,4.253,9.5,9.5,9.5h123.167v20.719L97.15,276.42c-7.5,3.52-10.728,12.451-7.209,19.951   c3.518,7.5,12.451,10.727,19.951,7.209l28.25-13.254c1.858,6.174,7.581,10.674,14.36,10.674c6.779,0,12.502-4.5,14.36-10.673   l28.25,13.254c7.507,3.52,16.435,0.285,19.951-7.209c3.519-7.5,0.291-16.432-7.209-19.951l-40.352-18.932v-20.719h123.167   c5.247,0,9.5-4.253,9.5-9.5v-195C300.168,27.022,295.915,22.769,290.668,22.769z M270.168,206.769H34.835v-154h235.333V206.769z"/></svg>'

var plusIconBig = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="45.402px" height="45.402px" viewBox="0 0 45.402 45.402" style="enable-background:new 0 0 45.402 45.402;" xml:space="preserve"><g><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></g></svg>'

var collapseIcon='<svg xmlns="http://www.w3.org/2000/svg" fill="#b657af" stroke="#b657af" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21  S39.776,16,37.059,16z"/></svg>'

var expandIcon='<svg xmlns="http://www.w3.org/2000/svg" fill="#b657af" stroke="#b657af" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><g><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></g></svg>'

var trophyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 981.555 981.555" style="enable-background:new 0 0 981.555 981.555;" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M512,112c0-25.641-9.984-49.75-28.117-67.875C456.906,17.141,417.795,9.914,384,21.844V16c0-8.836-7.163-16-16-16H144  c-8.837,0-16,7.164-16,16v5.844c-33.798-11.93-72.904-4.711-99.883,22.281C9.984,62.25,0,86.359,0,112s9.984,49.75,28.117,67.875  c0.2,0.203,0.438,0.328,0.643,0.523c0.193,0.188,0.33,0.406,0.529,0.586l109.258,98.75c5.021,4.555,58.156,45.031,85.453,52.07V384  l-16,64h-16c-17.673,0-32,14.328-32,32v32h192v-32c0-17.672-14.327-32-32-32h-16l-16-64v-52.195  c27.297-7.039,80.433-47.531,85.453-52.07l109.258-98.75c0.199-0.18,0.336-0.398,0.529-0.586c0.205-0.195,0.443-0.32,0.643-0.523  C502.016,161.75,512,137.641,512,112z M393.367,89.375c12.484-12.469,32.781-12.469,45.266,0C444.672,95.422,448,103.453,448,112  c0,8.461-3.281,16.406-9.207,22.43L384,183.953V95.766C387.382,94.227,390.587,92.156,393.367,89.375z M73.367,89.375  c12.484-12.469,32.781-12.469,45.266,0c2.78,2.781,5.985,4.844,9.367,6.391v88.187L73.207,134.43C67.281,128.406,64,120.461,64,112  C64,103.453,67.328,95.422,73.367,89.375z"/></svg>'

var refreshIconBig = '<svg width="100px" height="100px" stroke="white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V9M3 9H9M3 9C5.32744 6.91141 7.48287 4.54676 10.7453 4.08779C12.6777 3.81593 14.6461 4.17941 16.3539 5.12343C18.0617 6.06746 19.4164 7.54091 20.2139 9.32177M21 21V15M21 15H15M21 15C18.6725 17.0886 16.5171 19.4532 13.2546 19.9122C11.3223 20.1841 9.35388 19.8206 7.64607 18.8766C5.93826 17.9325 4.58353 16.4591 3.78601 14.6782" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'


var trophyIcon2='<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><g><path d="M256,250.719c-59.095,0-107.172,48.048-107.172,107.107S196.905,464.933,256,464.933     c59.095,0,107.172-48.048,107.172-107.107S315.094,250.719,256,250.719z M256,444.02c-47.565,0-86.26-38.667-86.26-86.196     s38.696-86.196,86.26-86.196s86.26,38.667,86.26,86.196C342.26,405.354,303.564,444.02,256,444.02z"/><path d="M510.777,11.057c-1.814-3.415-5.366-5.768-9.232-5.768H324.945c-3.474,0-6.722,1.946-8.667,4.826l-60.222,89.33     l-60.341-89.394c-1.945-2.875-5.189-4.764-8.662-4.764H10.456c-3.869,0-7.42,2.356-9.235,5.772     c-1.814,3.417-1.593,7.665,0.572,10.87l153.112,226.567c-29.437,27.22-47.9,66.157-47.9,109.302     c0,82.104,66.839,148.915,148.995,148.915s148.995-66.79,148.995-148.895c0-43.077-18.406-81.93-47.763-109.143L510.21,21.921     C512.373,18.717,512.592,14.471,510.777,11.057z M431.422,26.2L303.206,216.368c-14.268-4.775-29.493-7.55-45.302-7.75     L380.962,26.2H431.422z M330.503,26.2h25.23L231.301,210.762c-10.83,1.813-21.267,4.687-31.177,8.709L330.503,26.2z      M181.503,26.2l61.943,91.818l-12.591,18.543L156.289,26.2H181.503z M131.044,26.2l87.202,129.153l-25.211,37.24L80.596,26.2     H131.044z M30.144,26.2h25.209l125.071,185.186l-12.617,18.582L30.144,26.2z M384.083,357.826     c0,70.574-57.458,127.99-128.084,127.99s-128.084-57.416-128.084-127.99S185.374,229.836,256,229.836     S384.083,287.252,384.083,357.826z M340.882,235.304c-5.719-3.976-11.728-7.675-17.99-10.832L456.652,26.2h25.22L340.882,235.304     z"/></g></g></g></svg>';
var trophyIconBig = '<svg xmlns="http://www.w3.org/2000/svg" stroke="white" fill="white" width="180px" height="180px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 510 510" style="enable-background:new 0 0 981.555 981.555;" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M512,112c0-25.641-9.984-49.75-28.117-67.875C456.906,17.141,417.795,9.914,384,21.844V16c0-8.836-7.163-16-16-16H144  c-8.837,0-16,7.164-16,16v5.844c-33.798-11.93-72.904-4.711-99.883,22.281C9.984,62.25,0,86.359,0,112s9.984,49.75,28.117,67.875  c0.2,0.203,0.438,0.328,0.643,0.523c0.193,0.188,0.33,0.406,0.529,0.586l109.258,98.75c5.021,4.555,58.156,45.031,85.453,52.07V384  l-16,64h-16c-17.673,0-32,14.328-32,32v32h192v-32c0-17.672-14.327-32-32-32h-16l-16-64v-52.195  c27.297-7.039,80.433-47.531,85.453-52.07l109.258-98.75c0.199-0.18,0.336-0.398,0.529-0.586c0.205-0.195,0.443-0.32,0.643-0.523  C502.016,161.75,512,137.641,512,112z M393.367,89.375c12.484-12.469,32.781-12.469,45.266,0C444.672,95.422,448,103.453,448,112  c0,8.461-3.281,16.406-9.207,22.43L384,183.953V95.766C387.382,94.227,390.587,92.156,393.367,89.375z M73.367,89.375  c12.484-12.469,32.781-12.469,45.266,0c2.78,2.781,5.985,4.844,9.367,6.391v88.187L73.207,134.43C67.281,128.406,64,120.461,64,112  C64,103.453,67.328,95.422,73.367,89.375z"/></svg>'

var warningIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="15px" height="15px" fill="red" stroke="red"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 491.537 491.537" style="enable-background:new 0 0 491.537 491.537;" xml:space="preserve"><g><g>	<path d="M488.117,459.466l-223.1-447.2c-10.4-17.4-32-13.1-37.5,0l-225.2,449.3c-8,15.6,6.3,29.2,18.8,29.2h449.6c0,0,0.3,0,0.8,0    C487.517,490.766,497.017,472.466,488.117,459.466z M54.417,450.066l191.8-383.6l190.8,383.7h-382.6V450.066z"/><path d="M225.417,206.166v104.3c0,11.5,9.4,20.9,20.9,20.9c11.5,0,19.8-8.3,20.9-19.8v-105.4c0-11.5-9.4-20.9-20.9-20.9    C234.817,185.266,225.417,194.666,225.417,206.166z"/>		<circle cx="246.217" cy="388.066" r="20.5"/></g></g></svg>';

/*var calendarIcon2 = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 470 470" style="enable-background:new 0 0 470 470;" xml:space="preserve"><g><path d="M462.5,425H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5S466.643,425,462.5,425z"/><path d="M462.5,455H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5S466.643,455,462.5,455z"/><path d="M462.5,30h-25v-7.5C437.5,10.093,427.406,0,415,0s-22.5,10.093-22.5,22.5V30h-75v-7.5C317.5,10.093,307.406,0,295,0   s-22.5,10.093-22.5,22.5V30h-75v-7.5C197.5,10.093,187.407,0,175,0s-22.5,10.093-22.5,22.5V30h-75v-7.5C77.5,10.093,67.407,0,55,0   S32.5,10.093,32.5,22.5V30h-25C3.358,30,0,33.358,0,37.5v365c0,4.142,3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5v-365   C470,33.358,466.643,30,462.5,30z M407.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M287.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M167.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M47.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M32.5,45v7.5C32.5,64.907,42.593,75,55,75s22.5-10.093,22.5-22.5V45h75v7.5   c0,12.407,10.093,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45h75v7.5c0,12.407,10.094,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45h75v7.5   c0,12.407,10.094,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45H455v77.3H15V45H32.5z M15,395V137.3h440V395H15z"/><path d="M412,226.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,226.8,412,226.8z"/><path d="M331,226.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,226.8,331,226.8z"/><path d="M250,226.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,226.8,250,226.8z"/><path d="M169,226.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,226.8,169,226.8z"/><path d="M88,226.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,226.8,88,226.8z"/><path d="M331,280.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,280.8,331,280.8z"/><path d="M250,280.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,280.8,250,280.8z"/><path d="M169,280.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,280.8,169,280.8z"/><path d="M88,280.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,280.8,88,280.8z"/><path d="M331,334.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,334.8,331,334.8z"/><path d="M412,280.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,280.8,412,280.8z"/><path d="M412,334.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,334.8,412,334.8z"/><path d="M250,334.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,334.8,250,334.8z"/><path d="M169,334.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,334.8,169,334.8z"/><path d="M88,334.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,334.8,88,334.8z"/><path d="M412,172.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,172.8,412,172.8z"/><path d="M331,172.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,172.8,331,172.8z"/><path d="M250,172.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,172.8,250,172.8z"/><path d="M169,172.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,172.8,169,172.8z"/><path d="M88,172.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,172.8,88,172.8z"/></g></svg>';
*/
var calendarIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.2 489.2" style="enable-background:new 0 0 489.2 489.2;" xml:space="preserve"><g><path d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4    c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1    v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8    c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1    v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4    c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z     M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2    z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9    c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8    c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9    z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1    c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7    c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"/>	</g></svg>';

var calendarIconBig = '<svg xmlns="http://www.w3.org/2000/svg"  width="100px" height="100px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.2 489.2" style="enable-background:new 0 0 489.2 489.2;" xml:space="preserve"><g><path d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4    c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1    v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8    c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1    v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4    c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z     M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2    z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9    c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8    c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9    z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1    c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7    c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"/>	</g></svg>';

var saveIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M493.254,77.255l-58.508-58.51C422.742,6.742,406.465,0,389.49,0H352v112c0,8.836-7.164,16-16,16H80   c-8.836,0-16-7.164-16-16V0H32C14.328,0,0,14.326,0,32v448c0,17.673,14.328,32,32,32h448c17.672,0,32-14.327,32-32V122.51   C512,105.535,505.258,89.257,493.254,77.255z M448,448H64V256h384V448z"/>	<rect x="224" width="64" height="96"/></g></svg>'

var deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 284.011 284.011" style="enable-background:new 0 0 284.011 284.011;" xml:space="preserve"><g><g><path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611    c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106    c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68    l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706    c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396    c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z     M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455    c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604    c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z     M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108    C231.845,86.509,233.85,92.142,231.62,96.835z"/></g></g></svg>'


var emptyCircleToday = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px"  fill="#d330cb" stroke="#d330cb"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 29.107 29.107" style="enable-background:new 0 0 29.107 29.107;" xml:space="preserve"><g><g id="c149_moon"><path id="_x3C_Compound_Path_x3E__7_" d="M14.558,2.079c6.877,0,12.471,5.597,12.471,12.473c0,6.877-5.594,12.476-12.471,12.476    c-6.879,0-12.478-5.599-12.478-12.476C2.08,7.676,7.679,2.079,14.558,2.079 M14.558,0C6.563,0,0,6.562,0,14.552    c0,7.995,6.563,14.555,14.558,14.555s14.549-6.56,14.549-14.555C29.106,6.562,22.552,0,14.558,0L14.558,0z"/></g><g id="Capa_1_226_"></g></g></svg>'

var fullCirclePast = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#55d355" stroke="#55d355" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve"><circle cx="227.5" cy="227.5" r="227.5"/></svg>'

var fullCircleRed = fullCirclePast.replace("#55d355","red");

var minusIconGreen= '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#55d355" stroke="#55d355"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21  S39.776,16,37.059,16z"/></svg>';

var startIcon='<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 485 485" style="enable-background:new 0 0 485 485;" xml:space="preserve"><g>	<path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5   s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026   C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5   S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"/>	<polygon points="181.062,336.575 343.938,242.5 181.062,148.425  "/></g></svg>'