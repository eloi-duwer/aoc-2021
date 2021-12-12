#include <stdio.h>
#include <stdlib.h>

int main (int argc, char **argv) {
    if (argc < 2)
        return (1);
    FILE *fd = fopen(argv[1], "r");
    char *line = NULL;
    size_t len = 0;
    int prev = -1;
    int n_larger = 0;
    while (getline(&line, &len, fd) > 0) {
        int n = atoi(line);
        if (prev != -1 && n > prev) {
            n_larger++;
        }
        prev = n;
    }
    free(line);
    printf("%d\n", n_larger);
    return (0);
}