#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *fd = fopen("input", "r");
    char *line = NULL;
    size_t size = 0;

    int depth = 0;
    int pos = 0;
    int aim = 0;

    while (getline(&line, &size, fd) > 0) {
        if (strncmp(line, "down", 4) == 0) {
            aim += atoi(&line[5]);
        } else if (strncmp(line, "up", 2) == 0) {
            aim -= atoi(&line[3]);
        } else if (strncmp(line, "forward", 7) == 0) {
            int n = atoi(&line[8]);
            pos += n;
            depth += aim * n;
        }
    }
    free(line);
    fclose(fd);
    printf("%d %d\n", pos, depth);
    printf("%d\n", pos * depth);
    return (0);
}