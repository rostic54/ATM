import {
  Component, Input,
} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  @Input() control: FormControl;
  @Input() integer: boolean = false;

  addNumber(input: number): void {
    const newValue = this.setDefaultValue() + input;
    this.control.setValue(newValue);
  }

  clearLast(): void {
    const newValue = this.setDefaultValue().slice(0, -1);
    this.control.setValue(newValue);
  }

  clearAll(): void {
    this.control.reset(null);
  }

  setDefaultValue(): string {
    if (this.control.value) {
      return this.control.value.toString();
    }
    return ''
  }
}
