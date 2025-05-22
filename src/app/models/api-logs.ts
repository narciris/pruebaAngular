export interface ApiLogs {

    
}
export interface LogResponse {
    id:         number;
    user_id:     number;
    method:     string;
    date:       Date;
    data:       Data[];
    created_at: Date;
    updated_at: Date;
}

export interface Data {
    id:      number;
    title:    string;
    name: string;
    email:string;
    body:   string;
    
}


// Interfaz base para todos los tipos de campos
export interface FormFieldBase {
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder: string;
  }
  
  // Interfaz para campos de texto (text, email, number, etc.)
  export interface TextField extends FormFieldBase {
    type: 'text' | 'email' | 'number';
  }
  
  // Interfaz para las opciones de los campos select
  export interface SelectOption {
    label: string;
    value: string;
  }


