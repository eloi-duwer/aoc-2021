#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *fd = fopen("input", "r");

    char *line = NULL;
    size_t size = 0;

    int summs[12] = {0};

    while (getline(&line, &size, fd) > 0) {
        int i = 0;
        while (i < 12) {
            if (line[i] == '0')
                summs[i]--;
            else
                summs[i]++;
            i++;
        }
    }
    unsigned int res = 0;
    int i = 0;
    while (i < 12) {
        res = res << 1;
        printf("%d\n", summs[i]);
        if (summs[i] < 0)
            res |= 0x1;
        i++;
    }
    printf("%u\n", res * (~res & 0xFFF));
}