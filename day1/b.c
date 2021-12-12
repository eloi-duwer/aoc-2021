#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main (int argc, char **argv) {
    FILE *fd = fopen("./input", "r");
    char *line = NULL;
    size_t len = 0;
    int buff[3] = {0};
    int prev_sum = 0;
    int n_larger = 0;
    while (getline(&line, &len, fd) > 0) {
        memmove(buff, &buff[1], 2 * sizeof(int));
        buff[2] = atoi(line);
        if ((buff[0] * buff[1] * buff[2])) {
            if (prev_sum > 0 && buff[0] + buff[1] + buff[2] > prev_sum) {
                n_larger++;
            }
            prev_sum = buff[0] + buff[1] + buff[2];
            printf("%d + %d + %d = %d\n", buff[0], buff[1], buff[2], prev_sum);
        }
    }
    free(line);
    printf("%d\n", n_larger);
    return (0);
}