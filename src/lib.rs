use wasm_bindgen::prelude::*;

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}
#[wasm_bindgen]
pub fn getMax(list: &[u32]) -> u32 {
    largest(list)
}

// css 前置标签刷新
fn get_inner_code_type(curr_type: &str) -> &str {
    let match_type = curr_type;
    let result_code = match match_type {
        "refresh_css" => "let _refreshCssCode_ = document.getElementById('innerCssCode')||document.createElement('div');_refreshCssCode_.setAttribute('id','innerCssCode');_refreshCssCode_.innerHTML='';document.getElementById('root').appendChild(_refreshCssCode_);",
        // "css_replace" => "",
        _ => ""
    };

    result_code
}

#[wasm_bindgen]
pub fn getCompiledCode(curr_type: &str) -> String {
    String::from(get_inner_code_type(curr_type))
}

// jsx编译后代码生成
fn get_after_compile_code(after_code: &str) -> String {
    // 初始化及复写表示获取
    let split_result: Vec<&str> = after_code.split("::__||").collect();
    let code_type = split_result[0];
    let code_content = split_result[1];
    let mut result_code: String = String::from("");
    if code_type == "isReWrite" {
        // 复写代码编译内容
        result_code =  format!("var exports={{}};const {{ useRef, useState }} = React;{};document.getElementById('previewFrame').innerHTML='';let targetRoot = document.createElement('div');targetRoot.setAttribute('id','previewContent');document.getElementById('previewFrame').appendChild(targetRoot);window._rootHandler = ReactDOM.createRoot(document.getElementById('previewContent'));window._rootHandler.render(React.createElement(_default))",code_content);
    } else {
        // 初始化代码内容
        result_code = format!("var exports={{}};const {{useRef, useState }} = React;{};let targetRoot = document.createElement('div');targetRoot.setAttribute('id','previewContent');document.getElementById('previewFrame').appendChild(targetRoot);window._rootHandler = ReactDOM.createRoot(document.getElementById('previewContent'));window._rootHandler.render(React.createElement(_default));",code_content);
    }
    result_code
}

#[wasm_bindgen]
pub fn getCompiledJSXCode(after_code: &str) -> String {
    String::from(get_after_compile_code(after_code))
}

// css文件编译代码
fn get_css_compiled_file(css_name: &str, css_file: &str) -> String {
    let result_code = format!("let {} = document.createElement('style');{}.innerText=`{}`;document.getElementById('innerCssCode').appendChild({});",css_name,css_name,css_file,css_name);
    result_code
}

#[wasm_bindgen]
pub fn getCompiledCssCode(css_name: &str, css_file: &str) -> String {
    String::from(get_css_compiled_file(css_name, css_file))
}

fn duplicate_check(dp_str: &str) -> String {
    let result_code = format!("let offList=[];let doDuplicateStr = importCheckedCode.replace(/{}.*()/g,(match,offset)=>{{match.includes('()')&&offList.push(match);return 'D_'+offList.length+'_'+match}});importCheckedCode=doDuplicateStr",dp_str);
    result_code
}

#[wasm_bindgen]
pub fn getDuplicatedCode(dp_str: &str) -> String {
    String::from(duplicate_check(dp_str))
}
