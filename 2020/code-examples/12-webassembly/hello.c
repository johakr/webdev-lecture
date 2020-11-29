#include <stdio.h>

int main(int argc, char ** argv) {
    printf("Hello FROM C\n");
}

// emcc hello.c -s WASM=1 -o hello.html